import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiArrowRight,
  FiUsers,
  FiMapPin,
  FiInstagram,
  FiArrowUpRight,
  } from "react-icons/fi";
import cover from "../assets/images/Carousel/carousel1.JPG";
import configuredEvents from "../premiere/events.json";
import usePremiere from "../premiere/usePremiere";
import PremierePlayer from "../premiere/PremierePlayer";
import { premierePhase, remainingSeconds } from "../premiere/timing";
import "./WeddingPremiere.css";

const reactions = [
  { type: "moved", emoji: "🥹" },
  { type: "heart", emoji: "❤️" },
  { type: "laugh", emoji: "😂" },
  { type: "fire", emoji: "🔥" },
];
const formatDate = (event) =>
  new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: event.timeZone,
  }).format(new Date(event.date + "T12:00:00"));
const formatTime = (event) =>
  new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: event.timeZone,
  }).format(new Date(event.premiere_start_time));
function InstagramBox() {
  return (
    <a
      className="premiere-instagram"
      href="https://www.instagram.com/serenaferrarisphotography/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visita Serena Ferraris su Instagram (si apre in una nuova scheda)"
    >
      <FiInstagram className="premiere-instagram-icon" aria-hidden="true" />
      <span className="premiere-instagram-copy">
        <span className="premiere-instagram-eyebrow">CONTINUIAMO A CONDIVIDERE EMOZIONI</span>
        <span className="premiere-instagram-title">Ci vediamo su Instagram</span>
        <span className="premiere-instagram-handle">@serenaferrarisphotography</span>
      </span>
      <FiArrowUpRight className="premiere-instagram-arrow" aria-hidden="true" />
    </a>
  );
}

function Names({ event }) {
  return (
    <h1 className="premiere-names">
      {event.bride}
      <span aria-label="cuore">♡</span>
      {event.groom}
    </h1>
  );
}
function Clock({ seconds }) {
  const values = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  return (
    <div
      className="premiere-clock"
      role="timer"
      aria-label={values
        .map((v, i) => v + " " + ["giorni", "ore", "minuti", "secondi"][i])
        .join(",")}
    >
      {values.map((value, i) => (
        <div key={i}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{["GIORNI", "ORE", "MINUTI", "SECONDI"][i]}</span>
        </div>
      ))}
    </div>
  );
}
export default function WeddingPremiere() {
  const { slug } = useParams();
  const [entered, setEntered] = useState(false);
  const [replay, setReplay] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(Infinity);
  const [reactionError, setReactionError] = useState("");
  const live = usePremiere(slug, entered);
  const event = live.event || configuredEvents.find((e) => e.slug === slug);
  const end = useCallback(() => {
    setEnded(true);
    setReplay(false);
  }, []);
  useEffect(() => {
    if (!reactionError) return;
    const timer = setTimeout(() => setReactionError(""), 4000);
    return () => clearTimeout(timer);
  }, [reactionError]);
  const phase = !entered
    ? "invitation"
    : replay
      ? "replay"
      : ended
        ? "ended"
        : live.now === null
          ? "waiting"
          : premierePhase(event.premiere_start_time, live.now, duration);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);
  if (!event)
    return (
      <main className="premiere premiere-unavailable">
        <Helmet>
          <title>Wedding première | Serena Ferraris</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <span className="premiere-eyebrow">
          SERENA FERRARIS · WEDDING FILMS
        </span>
        <h1>
          {live.error
            ? "Questo invito non è disponibile."
            : "Il vostro invito sta arrivando…"}
        </h1>
        <p>{live.error || "Solo un istante."}</p>
        <a href="/">Torna al sito</a>
      </main>
    );
  const seconds =
    live.now === null
      ? null
      : remainingSeconds(event.premiere_start_time, live.now);
  const film = phase === "live" || phase === "replay";
  const enter = () => {
    if (live.event && live.now !== null) setEntered(true);
  };
  return (
    <main className={"premiere premiere-" + phase}>
      <Helmet>
        <title>
          {event.bride} & {event.groom} — Wedding première
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#131311" />
      </Helmet>
      {phase === "invitation" && (
        <>
          <section className="premiere-invitation-grid">
            <div className="premiere-invite-copy">
              <span className="premiere-eyebrow">
                <span className="premiere-tiny-line" /> SIETE PARTE DELLA NOSTRA
                STORIA
              </span>
              <Names event={event} />
              <p className="premiere-date">{formatDate(event)}</p>
              <div className="premiere-invitation-message">
                <p>Questa giornata è appena iniziata.</p>
                <p>
                  Questa sera la rivivremo <em>insieme.</em>
                </p>
              </div>
              <p className="premiere-intro">
                Gli sguardi, gli abbracci, le parole non dette.
                <br />
                Il nostro giorno più bello, sul grande schermo.
              </p>
              <button
                className="premiere-button"
                onClick={enter}
                disabled={!live.event || live.now === null}
              >
                ENTRA NELLA PREMIÈRE <FiArrowRight />
              </button>
              <span className="premiere-private">
                Un invito speciale, per chi c’era davvero.
              </span>
              {live.error && (
                <p role="status" className="premiere-connection">
                  {live.error}
                </p>
              )}
              <div className="premiere-invite-details">
                <span>
                  <FiMapPin /> {event.location}
                </span>
                <span>
                  LA PREMIÈRE <b>{formatTime(event)}</b>
                </span>
              </div>
              <InstagramBox />
            </div>
            <div className="premiere-cover">
              <img
                src={event.coverImage || cover}
                alt={
                  "Un abbraccio degli sposi, " +
                  event.bride +
                  " e " +
                  event.groom
                }
              />
              <div className="premiere-cover-shade" />
              <span className="premiere-cover-top">THE WEDDING PREMIÈRE</span>
              <div className="premiere-cover-caption">
                <span>IL NOSTRO FILM. LA NOSTRA STORIA.</span>
                <p>{event.name}</p>
              </div>
              <span className="premiere-cover-bottom">
                CON AMORE, {event.bride.toUpperCase()} &{" "}
                {event.groom.toUpperCase()}
              </span>
            </div>
          </section>
        </>
      )}
      {phase === "waiting" && (
        <section className="premiere-room">
          <div
            className="premiere-room-photo"
            style={{
              backgroundImage: 'url("' + (event.coverImage || cover) + '")',
            }}
          />
          <div className="premiere-room-content">
            <span className="premiere-eyebrow">WEDDING LIVE PREMIÈRE</span>
            <Names event={event} />
            <p className="premiere-room-message">
              Le emozioni della giornata.
              <br />
              <em>Tutti insieme.</em>
            </p>
            <span className="premiere-eyebrow">IL FILM INIZIA TRA</span>
            {seconds !== null ? (
              <Clock seconds={seconds} />
            ) : (
              <p>Sincronizziamo la sala…</p>
            )}
            <p className="premiere-presence">
              <FiUsers />{" "}
              {live.connected
                ? live.viewers +
                  (live.viewers === 1
                    ? " persona sta aspettando la première"
                    : " persone stanno aspettando la première")
                : "Connessione alla sala…"}
            </p>
            <p className="premiere-room-note">
              Mettiti comodo. Il prossimo ricordo sta per cominciare.
            </p>
            <span className="premiere-schedule">
              {new Intl.DateTimeFormat("it-IT", {
                day: "numeric",
                month: "long",
                timeZone: event.timeZone,
              }).format(new Date(event.premiere_start_time))}{" "}
              · ORE {formatTime(event)}
            </span>
            <InstagramBox />
          </div>
        </section>
      )}
      {phase === "countdown" && (
        <section className="premiere-finale-count">
          <span className="premiere-eyebrow">IL VOSTRO POSTO È QUI</span>
          <h2>Preparatevi</h2>
          <div className="premiere-count-ring">
            <strong key={seconds} role="timer">
              {seconds}
            </strong>
          </div>
          <p>Sta per cominciare qualcosa di indimenticabile.</p>
          <span>
            {event.bride} ♡ {event.groom}
          </span>
          <InstagramBox />
        </section>
      )}
      {film && (
        <section className="premiere-cinema">
          <div className="premiere-cinema-title">
            <div>
              <span className="premiere-eyebrow">
                {replay ? "RIVIVI LA PREMIÈRE" : "WEDDING LIVE PREMIÈRE"}
              </span>
              <h1>
                {event.bride} <i>♡</i> {event.groom}
              </h1>
            </div>
            <span className="premiere-live-tag">
              <span /> {replay ? "REPLAY" : "IN ONDA"}
            </span>
          </div>
          <div className="premiere-video-wrap">
            <PremierePlayer
              key={replay ? "replay" : "live"}
              event={event}
              getNow={live.getNow}
              replay={replay}
              onEnd={end}
              onDuration={setDuration}
            />
            <div className="premiere-bursts" aria-hidden="true">
              {live.bursts.map((burst, i) => (
                <span
                  key={burst.id}
                  style={{ left: 12 + ((i * 23) % 76) + "%" }}
                >
                  {reactions.find((r) => r.type === burst.type)?.emoji}
                </span>
              ))}
            </div>
          </div>
          <div className="premiere-reaction-heading">
            <p>
              Le emozioni sono più belle <em>condivise.</em>
            </p>
            <span>
              <FiUsers />{" "}
              {live.connected
                ? live.viewers + " insieme a voi"
                : "Riconnessione…"}
            </span>
          </div>
          <div className="premiere-reactions">
            {reactions.map((r) => (
              <button
                key={r.type}
                disabled={!live.connected}
                aria-label={r.label || r.type}
                onClick={() =>
                  live.react(r.type).catch((e) => setReactionError(e.message))
                }
              >
                <span>{r.emoji}</span>
              </button>
            ))}
          </div>
          <p role="status" className="premiere-reaction-feedback">
            {reactionError}
          </p>
        </section>
      )}
      {phase === "ended" && (
        <section className="premiere-ending">
          <span className="premiere-eyebrow">
            IL FILM FINISCE. LA STORIA CONTINUA.
          </span>
          <span className="premiere-ending-heart">♡</span>
          <h2>
            Questa giornata resterà
            <br />
            con voi <em>per sempre.</em>
          </h2>
          <Names event={event} />
          <p>Grazie per aver vissuto questo momento insieme.</p>
          <button
            className="premiere-button"
            onClick={() => {
              setEnded(false);
              setReplay(true);
            }}
          >
            RIVIVI LA PREMIÈRE <FiArrowRight />
          </button>
          <InstagramBox />
        </section>
      )}
      {entered && (!live.connected || live.error) && (
        <p className="premiere-network" role="status">
          Stiamo riconnettendo la sala. Presenze e reazioni si aggiorneranno a
          breve.
        </p>
      )}
    </main>
  );
}
