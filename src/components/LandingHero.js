const heroImg = require("../assets/images/Carousel/carousel1.JPG");

const LandingHero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-5 py-6 sm:px-10 sm:py-10"
      aria-label="Hero landing page"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: `url(${heroImg})` }}
        role="img"
        aria-label="Sposa e sposo"
      />

      {/* Overlay / veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/60 to-white/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-2xl place-items-center text-center">
        <div>
          <p className="mb-4 text-xs tracking-[0.28em] text-slate-900/60 sm:text-sm">
            GUIDA GRATUITA PER COPPIE
          </p>

          <h1 className="font-serif text-[clamp(34px,5.4vw,64px)] leading-[1.06] text-slate-900/90">
            L’Arte di Raccontare <br />
            <span className="mt-2 inline-block italic text-[#1f3865]/90">
              il Vostro Amore
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[42ch] text-[clamp(15px,1.6vw,18px)] leading-7 text-slate-900/55">
            Scopri come trasformare il tuo matrimonio in una storia da vivere e
            rivivere per sempre attraverso la fotografia emozionale
          </p>

          <a
            href="#download"
            className="mt-7 inline-flex w-full max-w-[520px] items-center justify-center rounded-sm bg-[#1f3865] px-5 py-4 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3865]/40"
          >
            SCARICA L’EBOOK GRATUITO
          </a>

          {/* Mouse scroll (subito sotto CTA) */}
          <div className="mt-12 flex justify-center animate-scroll">
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-900/30">
              <span className="mt-2 block h-2 w-1 rounded-full bg-slate-900/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
