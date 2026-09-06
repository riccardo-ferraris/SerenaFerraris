const http = require('node:http');
const { randomUUID } = require('node:crypto');
const reactionTypes = ['moved', 'heart', 'laugh', 'fire'];
function createPremiereServer({ events = require('../src/premiere/events.json'), now = Date.now, origin = process.env.PREMIERE_ORIGIN || 'http://localhost:3000' } = {}) {
  const rooms = new Map();
  const catalog = new Map();
  for (const event of events) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.slug) || catalog.has(event.slug) || !Number.isFinite(Date.parse(event.premiere_start_time))) throw new Error('Invalid or duplicate event: ' + event.slug);
    catalog.set(event.slug, event);
    rooms.set(event.slug, { clients: new Map() });
  }
  const send = (res, type, value) => { if (!res.destroyed) res.write('event: ' + type + '\ndata: ' + JSON.stringify(value) + '\n\n'); };
  const broadcastState = room => {
    for (const [clientId, client] of room.clients) send(client.res, 'state', { clientId, viewers: room.clients.size, serverTime: now() });
  };
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.headers.origin) {
      // CRA rewrites the Origin of proxied POSTs to package.json's proxy target.
      // Accept that exact loopback target only for the default local development setup.
      const developmentProxyOrigin = process.env.NODE_ENV !== 'production'
        && !process.env.PREMIERE_ORIGIN
        && origin === 'http://localhost:3000'
        ? 'http://127.0.0.1:' + req.socket.localPort
        : null;
      if (req.headers.origin !== origin && req.headers.origin !== developmentProxyOrigin) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Origin not allowed' }));
        return;
      }
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin); res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    const match = new URL(req.url, 'http://localhost').pathname.match(/^\/api\/events\/([a-z0-9-]+)(?:\/(stream|reactions))?$/);
    const json = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
    if (!match || !catalog.has(match[1])) { json(404, { error: 'Event not found' }); return; }
    const event = catalog.get(match[1]); const room = rooms.get(match[1]);
    if (req.method === 'GET' && !match[2]) { json(200, { event, serverTime: now() }); return; }
    if (req.method === 'GET' && match[2] === 'stream') {
      // Streaming events must reach the browser immediately, without gzip buffering.
      res.setHeader('Cache-Control', 'no-store, no-transform');
      res.writeHead(200, { 'Content-Type': 'text/event-stream', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
      res.write('retry: 2000\n\n');
      const clientId = randomUUID();
      room.clients.set(clientId, { res, lastReaction: -Infinity });
      broadcastState(room);
      const heartbeat = setInterval(() => { res.write(': heartbeat\n\n'); }, 10000);
      res.on('close', () => { clearInterval(heartbeat); room.clients.delete(clientId); broadcastState(room); });
      return;
    }
    if (req.method === 'POST' && match[2] === 'reactions') {
      try {
        let body = ''; let bytes = 0;
        for await (const chunk of req) { bytes += chunk.length; if (bytes > 1024) { json(413, { error: 'Body too large' }); return; } body += chunk; }
        const { type, clientId } = JSON.parse(body);
        if (!reactionTypes.includes(type)) { json(400, { error: 'Invalid reaction' }); return; }
        const client = room.clients.get(clientId);
        if (!client) { json(403, { error: 'Join this event first' }); return; }
        if (now() < Date.parse(event.premiere_start_time)) { json(409, { error: 'Premiere has not started' }); return; }
        if (now() - client.lastReaction < 350) { json(429, { error: 'Slow down' }); return; }
        client.lastReaction = now();
        const reaction = { id: randomUUID(), type };
        for (const target of room.clients.values()) send(target.res, 'reaction', reaction);
        json(200, { ok: true });
      } catch { if (!res.headersSent) json(400, { error: 'Invalid request' }); }
      return;
    }
    json(405, { error: 'Method not allowed' });
  });
  server.closeStreams = () => { for (const room of rooms.values()) for (const client of room.clients.values()) client.res.end(); };
  return server;
}
if (require.main === module) {
  const server = createPremiereServer();
  server.listen(Number(process.env.PORT || 3001), () => console.log('Premiere API listening on port ' + (process.env.PORT || 3001)));
  const stop = () => { server.closeStreams(); server.close(); };
  process.on('SIGTERM', stop); process.on('SIGINT', stop);
}
module.exports = { createPremiereServer };
