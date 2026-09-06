const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createPremiereServer } = require('./premiere.cjs');
const express = require('express');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
for (const throughProxy of [false, true]) test('server time, shared presence, ephemeral reactions and isolation ' + (throughProxy ? 'through CRA proxy' : 'directly'), async () => {
  const clock = Date.parse('2026-09-12T20:00:00Z');
  const events = ['one', 'two'].map(id => ({ id, slug: id, premiere_start_time: '2026-09-12T19:30:00Z' }));
  const server = createPremiereServer({ events, now: () => clock });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const target = 'http://127.0.0.1:' + server.address().port;
  // Match CRA's compression and Origin rewriting, rather than bypassing its proxy.
  const app = express();
  app.use(compression());
  app.use(createProxyMiddleware({
    target, changeOrigin: true, logLevel: 'silent',
    onProxyReq: req => { if (req.getHeader('origin')) req.setHeader('origin', target); }
  }));
  const proxy = await new Promise(resolve => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  const base = (throughProxy ? 'http://127.0.0.1:' + proxy.address().port : target) + '/api/events/';

  const controllers = [];
  async function stream(slug) {
    const controller = new AbortController(); controllers.push(controller);
    const response = await fetch(base + slug + '/stream', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) });
    assert.equal(response.headers.get('content-encoding'), null, 'SSE must not be buffered by gzip');
    const reader = response.body.getReader(); let buffer = '';
    return async type => {
      for (;;) {
        let index;
        while ((index = buffer.indexOf('\n\n')) >= 0) {
          const item = buffer.slice(0, index); buffer = buffer.slice(index + 2);
          if (item.startsWith('event: ' + type + '\n')) return JSON.parse(item.split('\ndata: ')[1]);
        }
        const { value, done } = await reader.read();
        if (done) throw new Error('Stream closed');
        buffer += new TextDecoder().decode(value);
      }
    };
  }
  try {
    assert.equal((await (await fetch(base + 'one')).json()).serverTime, clock);
    assert.equal((await fetch(base + 'missing')).status, 404);
    // Browser POSTs through CRA carry the rewritten backend origin.
    assert.equal((await fetch(target + '/api/events/one/reactions', {
      method: 'POST', headers: { Origin: 'https://untrusted.example' }, body: '{}'
    })).status, 403);
    assert.equal((await fetch(base + 'one/reactions', {
      method: 'POST', headers: { Origin: 'http://localhost:3000' }, body: '{"type":"invalid"}'
    })).status, 400);
    const a = await stream('one'); const first = await a('state');
    assert.equal(first.viewers, 1);
    const b = await stream('one'); const second = await b('state');
    assert.equal(second.viewers, 2); assert.equal((await a('state')).viewers, 2);
    const other = await stream('two'); assert.equal((await other('state')).viewers, 1);
    const post = (slug, type, clientId) => fetch(base + slug + '/reactions', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: new URL(base).origin }, body: JSON.stringify({ type, clientId }) });
    assert.equal((await post('two', 'heart', first.clientId)).status, 403);
    assert.equal((await post('one', 'invalid', first.clientId)).status, 400);
    assert.equal((await post('one', 'heart', first.clientId)).status, 200);
    const reaction = await a('reaction');
    assert.equal(reaction.type, 'heart');
    assert.deepEqual(Object.keys(reaction).sort(), ['id', 'type']);
    assert.deepEqual(await b('reaction'), reaction);
    assert.equal((await post('one', 'heart', first.clientId)).status, 429);
    // The stock CRA proxy retains upstream SSE sockets after a browser disconnect.
    // Test immediate disconnect accounting on the direct backend connection.
    if (!throughProxy) {
      controllers[1].abort();
      assert.equal((await a('state')).viewers, 1);
    }
    const newcomer = await stream('one');
    const state = await newcomer('state');
    assert.deepEqual(Object.keys(state).sort(), ['clientId', 'serverTime', 'viewers']);
  } finally {
    controllers.forEach(c => c.abort()); server.closeStreams(); await new Promise(resolve => server.close(resolve));
    proxy.closeAllConnections();
    await new Promise(resolve => proxy.close(resolve));
  }
});
