import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiInstagram } from "react-icons/fi";

export const INSTAGRAM_URL = "https://www.instagram.com/serenaferrarisphotography/";
export const INSTAGRAM_REDIRECT_SECONDS = 5;

export default function InstagramFinale() {
  const [seconds, setSeconds] = useState(INSTAGRAM_REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    const deadline = Date.now() + INSTAGRAM_REDIRECT_SECONDS * 1000;
    const countdown = setInterval(() => {
      setSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    }, 1000);
    const redirect = setTimeout(() => {
      window.location.assign(INSTAGRAM_URL);
    }, INSTAGRAM_REDIRECT_SECONDS * 1000);
    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [cancelled]);

  return (
    <div className="premiere-instagram-finale">
      <div className="premiere-instagram-profile">
        <span className="premiere-instagram-avatar">
          <FiInstagram className="premiere-instagram-finale-icon" aria-hidden="true" />
        </span>
        <div>
          <span className="premiere-instagram-profile-name">Serena Ferraris</span>
          <span className="premiere-instagram-handle">@serenaferrarisphotography</span>
        </div>
      </div>
      <div className="premiere-instagram-message">
        <span className="premiere-eyebrow">IL PROSSIMO RICORDO TI ASPETTA</span>
        <h3>Le emozioni continuano.<br /><em>Su Instagram.</em></h3>
        <p>Seguimi e lasciati ispirare da altre storie d’amore.</p>
      </div>
      <a className="premiere-button premiere-instagram-cta" href={INSTAGRAM_URL}>
        APRI INSTAGRAM E SEGUIMI <FiArrowUpRight aria-hidden="true" />
      </a>
      {cancelled ? (
        <p role="status">Reindirizzamento automatico annullato.</p>
      ) : (
        <div className="premiere-instagram-redirect">
          <div className="premiere-instagram-countdown">
            <strong className="premiere-instagram-seconds" role="timer" aria-label={`${seconds} secondi`}>{seconds}</strong>
            <p><span>Ci siamo quasi.</span>Instagram si aprirà automaticamente tra {seconds} secondi.</p>
          </div>
          <button className="premiere-stay" onClick={() => setCancelled(true)}>
            Resta su questa pagina
          </button>
        </div>
      )}
    </div>
  );
}
