import { useEffect, useRef, useState, useCallback } from 'react';
const base = (process.env.REACT_APP_PREMIERE_API_URL || '').replace(/\/$/, '');
export const apiUrl = slug => base + '/api/events/' + encodeURIComponent(slug);
export default function usePremiere(slug, entered) {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);
  const [snapshot, setSnapshot] = useState({ viewers: 0 });
  const [bursts, setBursts] = useState([]);
  const anchor = useRef(null);
  const [now, setNow] = useState(null);
  const client = useRef(null);
  const getNow = useCallback(() => anchor.current ? anchor.current.server + performance.now() - anchor.current.local : null, []);
  useEffect(() => {
    let disposed = false;
    let busy = false;
    const controller = new AbortController();
    setEvent(null); setError(''); anchor.current = null; setNow(null);
    async function sync() {
      if (busy) return;
      busy = true;
      const start = performance.now();
      try {
        const response = await fetch(apiUrl(slug), { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error(response.status === 404 ? 'Questo invito non è disponibile.' : 'La sala non è raggiungibile. Riproviamo tra poco.');
        const data = await response.json();
        if (disposed) return;
        anchor.current = { server: data.serverTime + (performance.now() - start) / 2, local: performance.now() };
        setNow(getNow()); setEvent(data.event); setError('');
      } catch (e) {
        if (!disposed) setError((e instanceof SyntaxError || e.message === 'Failed to fetch') ? 'Connessione alla sala in corso. Riproviamo tra poco.' : e.message);
      } finally { busy = false; }
    }
    sync();
    const polling = setInterval(sync, 15000);
    const tick = setInterval(() => setNow(getNow()), 250);
    const visible = () => { if (!document.hidden) sync(); };
    document.addEventListener('visibilitychange', visible);
    return () => { disposed = true; controller.abort(); clearInterval(polling); clearInterval(tick); document.removeEventListener('visibilitychange', visible); };
  }, [slug, getNow]);
  useEffect(() => {
    if (!entered) return;
    const source = new EventSource(apiUrl(slug) + '/stream');
    source.addEventListener('state', e => {
      const data = JSON.parse(e.data);
      client.current = data.clientId;
      setSnapshot(data); setConnected(true);
    });
    source.addEventListener('reaction', e => {
      const data = JSON.parse(e.data);
      setBursts(items => [...items.slice(-15), { ...data, received: performance.now() }]);
    });
    source.onerror = () => { client.current = null; setConnected(false); };
    const clean = setInterval(() => setBursts(items => items.filter(i => performance.now() - i.received < 3500)), 1000);
    return () => { source.close(); clearInterval(clean); client.current = null; setConnected(false); };
  }, [slug, entered]);
  const react = async type => {
    if (!client.current) throw new Error('Riconnessione in corso. Attendi un momento.');
    const response = await fetch(apiUrl(slug) + '/reactions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, clientId: client.current })
    });
    if (!response.ok) throw new Error(response.status === 429 ? 'Un piccolo respiro… riprova tra un istante.' : 'Reazione non inviata. Riprova.');
  };
  return { event, error, connected, now, getNow, ...snapshot, bursts, react };
}
