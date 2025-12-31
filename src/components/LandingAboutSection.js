import aboutImg from "../assets/images/AboutMe/about1.JPG";

const LandingAboutSection = () => {
  return (
    <section className="bg-gray-100 px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* TOP COPY */}
        <div className="mx-auto text-center">
          <p className="text-xs tracking-[0.28em] text-slate-900/50 sm:text-sm">
            CHI SONO
          </p>

          <h2 className="mt-4 font-serif text-[clamp(34px,4.2vw,56px)] leading-[1.05] text-slate-900/85">
            Ciao, sono <br />
            <span className="italic text-[#1f3865]/90">Serena Ferraris</span>
          </h2>

          <div className="mt-8 space-y-6 text-base leading-8 text-slate-900/55 sm:text-lg">
            <p>
              Da oltre 10 anni racconto storie d&apos;amore attraverso la mia
              fotocamera. Non mi considero un semplice fotografo, ma un
              narratore visivo che ha il privilegio di immortalare i momenti più
              belli della vostra vita.
            </p>

            <p>
              Il mio approccio è discreto e naturale: mi muovo tra gli ospiti
              come un invitato, catturando emozioni autentiche senza mai
              interrompere la magia del momento.
            </p>

            <p>
              Ho creato questa guida per condividere con voi tutto quello che ho
              imparato in anni di esperienza e aiutarvi a fare la scelta giusta
              per il giorno più importante della vostra vita.
            </p>
          </div>

          <div className="mt-10 h-px w-full bg-slate-900/10" />
        </div>

        {/* STATS + IMAGE */}
        <div className="mt-10 flex flex-col items-center gap-12">
          {/* Stats */}
          <div className="grid grid-cols-2 w-full">
            {/* Left stat */}
            <div className="w-full text-center pr-8">
              <p className="font-serif text-4xl text-[#1f3865]/90 sm:text-5xl">
                200+
              </p>
              <p className="mt-2 text-base text-slate-900/55 sm:text-lg">
                Matrimoni raccontati
              </p>
            </div>

            {/* Right stat */}
            <div className="w-full border-l border-slate-900/20 pl-8 text-center">
              <p className="font-serif text-4xl text-[#1f3865]/90 sm:text-5xl">
                10+
              </p>
              <p className="mt-2 text-base text-slate-900/55 sm:text-lg">
                Anni di esperienza
              </p>
            </div>
          </div>

          {/* Image with offset frame */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[560px]">
              <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border-2 border-slate-900/15" />

              <img
                src={aboutImg}
                alt="Fotografo durante un matrimonio"
                className="relative block w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAboutSection;
