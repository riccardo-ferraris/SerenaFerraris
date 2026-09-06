# Wedding première

Pagina invitati: `/anna-marco`. Le altre pagine del sito conservano il loro layout.

## Avvio locale

Node 22, dipendenze del progetto installate.

1. `npm run premiere:server`
2. In un secondo terminale: `npm start`
3. Apri `http://localhost:3000/anna-marco`.

Il proxy di sviluppo inoltra /api al server sulla porta 3001.
Usa due browser o dispositivi collegati allo stesso servizio per verificare le reazioni condivise.

## Configurare il matrimonio

Modifica `src/premiere/events.json` e riavvia il servizio (ricostruisci anche il frontend per aggiornare la copertina iniziale).
I dettagli Anna e Marco, data 12 settembre 2026 e ore 21:30 sono esempi. La foto proviene dal portfolio esistente e va sostituita con quella dell'evento.
Il film non è incluso: imposta `videoUrl` su un URL HTTPS diretto MP4 H.264/AAC, con supporto HTTP Range, oppure su /videos/matrimonio.mp4 inserendo il file in public/videos.
Non usare link a pagine YouTube/Vimeo: questo player richiede un file video.
`coverImage`: URL immagine o percorso pubblico; null usa la fotografia provvisoria.
`premiere_start_time`: data ISO con offset esplicito, per esempio 2026-09-12T21:30:00+02:00.
`date`: data del matrimonio. `timeZone`: fuso IANA per visualizzare gli orari.
`id`: identificativo stabile, `slug`: indirizzo pubblico univoco minuscolo (lettere, numeri, trattini).
`bride`, `groom`, `name`, `location` completano l'invito.
Per aggiungere un evento inserisci un altro oggetto con id e slug univoci; evita gli slug già usati dal sito (gallery, landing, contact_form).
Non è implementata una dashboard admin né un caricamento file: il catalogo separato e le API per evento sono la base per aggiungerli.

## Comportamento

Invito → waiting room → conto alla rovescia negli ultimi 30 secondi → film → ringraziamento e replay.
L'orario proviene da GET /api/events/:slug: compensazione di metà round-trip, avanzamento con performance.now(), nuova sincronizzazione ogni 15 secondi e al ritorno alla scheda.
Il player riallinea ogni 3 secondi quando lo scarto supera 1,5 secondi; un ingresso tardivo cerca la posizione condivisa. Il replay è personale e non viene riallineato.
La durata reale del file determina la fine anche per gli ingressi tardivi.
Autoplay silenzioso, pulsante audio e recupero manuale se il browser blocca anche l'avvio silenzioso. Il tocco di recupero riallinea comunque il film.
SSE trasmette presenze e animazioni effimere delle quattro reazioni. Le reazioni non vengono salvate né conteggiate: sono mostrate solo agli invitati collegati in quel momento e scompaiono dopo pochi secondi. Presenze = connessioni attive (due schede contano due volte); nessun conteggio inventato.
Le reazioni sono limitate a una ogni 350 ms per connessione e disponibili dopo l'inizio, anche nel replay.
Alla disconnessione EventSource si riconnette e riceve le presenze aggiornate, senza recuperare reazioni passate; il film può proseguire con l'ultimo orario sincronizzato.
La pagina è noindex e fuori dalla sitemap, ma resta pubblica per chi conosce il link: non è protetta da autenticazione.

## Pubblicazione

Il sito statico da solo non basta. Esegui server/premiere.cjs su un servizio Node sempre attivo. Non serve un disco persistente per le reazioni.
Imposta PREMIERE_ORIGIN sull'origine esatta del sito (es. https://serenaferraris.com).
Imposta REACT_APP_PREMIERE_API_URL sull'origine HTTPS del backend prima della build, oppure configura un reverse proxy /api sullo stesso dominio.
Abilita connessioni SSE durature senza buffering; non indirizzare /api al fallback SPA.
PORT configura la porta. Il vecchio file server/data/reactions.json non viene più letto né aggiornato.
Sincronizza l'orologio del server con NTP.
Questa versione usa un solo processo Node: prima di scalare su più istanze, usare presenze e pub/sub condivisi tra le istanze.
Conserva il rewrite SPA esistente per aprire direttamente /anna-marco.

## Verifica

`npm run test:premiere`: API, timestamp, due connessioni SSE, reazioni condivise, isolamento eventi, rate limit, disconnessione e assenza di conteggi o storico, anche attraverso il proxy React.
`npm test -- --watchAll=false`: transizioni e sincronizzazione.
`npm run build`: build produzione.
Prova pratica prima dell'evento: configura il vero video e una partenza tra due minuti; apri due dispositivi (Safari iOS e Chrome Android), entra in ritardo su uno, prova audio, reazioni, cambio scheda e perdita/ripristino della rete.
