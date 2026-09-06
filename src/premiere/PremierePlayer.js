import React, { useCallback, useEffect, useRef, useState } from 'react';
import { videoPosition } from './timing';
export default function PremierePlayer({ event, getNow, replay, onEnd, onDuration }) {
  const video = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const align = useCallback(() => {
    const node = video.current;
    const now = getNow();
    if (!node || !node.readyState || replay || now === null) return;
    const target = videoPosition(event.premiere_start_time, now);
    if (Number.isFinite(node.duration) && target >= node.duration) { onEnd(); return; }
    if (Math.abs(node.currentTime - target) > 1.5) node.currentTime = target;
  }, [event.premiere_start_time, getNow, replay, onEnd]);
  const play = useCallback(() => {
    align();
    video.current?.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
  }, [align]);
  useEffect(() => {
    const tick = setInterval(align, 3000);
    const visible = () => { if (!document.hidden) play(); };
    document.addEventListener('visibilitychange', visible);
    return () => { clearInterval(tick); document.removeEventListener('visibilitychange', visible); };
  }, [align, play]);
  if (!event.videoUrl) return <div className="premiere-video-message"><span className="premiere-eyebrow">IL FILM DELLA VOSTRA GIORNATA</span><h2>Le emozioni stanno arrivando.</h2><p>Il film sarà disponibile qui non appena sarà pronto.</p></div>;
  return <div className="premiere-screen">
    <video ref={video} src={event.videoUrl} autoPlay muted={muted} playsInline controls={replay} preload="auto"
      onLoadedMetadata={() => { onDuration(video.current.duration); play(); }}
      onEnded={onEnd} onWaiting={() => setBuffering(true)} onPlaying={() => { setBuffering(false); setBlocked(false); }}
      onError={() => { setError(true); setBuffering(false); }} aria-label={'Il film di ' + event.bride + ' e ' + event.groom} />
    {buffering && !error && !blocked && <p className="premiere-player-status" role="status">Prepariamo il vostro film…</p>}
    {error && <div className="premiere-video-message" role="alert"><p>Il film non è al momento raggiungibile.</p><button className="premiere-button" onClick={() => { setError(false); setBuffering(true); video.current.load(); }}>RIPROVA</button></div>}
    {blocked && !error && <button className="premiere-button premiere-play" onClick={play}>ENTRA NEL FILM ▷</button>}
    {!error && <button className="premiere-audio" onClick={() => { const next = !muted; video.current.muted = next; setMuted(next); play(); }}>{muted ? '♫ Attiva audio' : '♫ Disattiva audio'}</button>}
  </div>;
}
