import philosophyImg from "../assets/images/Carousel/carousel3.JPG";

const LandingPhilosophySection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${philosophyImg})` }}
        role="img"
        aria-label="Momento emozionale durante un matrimonio"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/65" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <p className="text-xs tracking-[0.34em] text-white/70 sm:text-sm">
          LA FILOSOFIA
        </p>

        <blockquote className="mt-10 font-serif text-[clamp(26px,3.8vw,44px)] italic leading-snug text-white/90">
          “Le foto più belle non sono quelle perfette.
          <br />
          <span className="inline-block mt-4">
            Sono quelle che ti fanno sentire qualcosa.”
          </span>
        </blockquote>

        <div className="mt-10 h-px w-28 bg-white/35" />

        <p className="mt-10 max-w-3xl text-[clamp(16px,1.6vw,20px)] leading-8 text-white/75">
          La fotografia wedding reportage emozionale cattura l&apos;essenza del
          vostro amore: gli sguardi complici, le lacrime di gioia, le risate
          spontanee. Momenti irripetibili che meritano di essere immortalati con
          sensibilità e arte.
        </p>
      </div>
    </section>
  );
};

export default LandingPhilosophySection;
