import { HiCheck } from "react-icons/hi";

const bullets = [
  "Come riconoscere un vero fotografo reportage emozionale",
  "Le 5 domande fondamentali da fare prima di scegliere",
  "Cosa aspettarsi da un servizio fotografico emotivo",
  "Come prepararsi al meglio per il giorno del matrimonio",
  "I segreti per essere naturali davanti all'obiettivo",
  "Come creare l'atmosfera giusta per foto autentiche",
  "Consigli sulla timeline perfetta per le foto",
  "Come scegliere le location più emozionanti",
];

const LandingWhatYouGetSection = () => {
  return (
    <section className="bg-gray-100 px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* TOP TEXT (fuori dalla grid, centrato) */}
        <div className="mx-auto text-center">
          <p className="text-xs tracking-[0.28em] text-slate-900/50 sm:text-sm">
            COSA TROVERAI
          </p>

          <h2 className="mt-4 font-serif text-[clamp(32px,4.6vw,56px)] leading-[1.05] text-slate-900/85">
            Tutto ciò che devi sapere{" "}
            <span className="italic text-[#1f3865]/90">prima del</span> grande
            giorno
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-900/55 sm:text-lg">
            Una guida completa e pratica che ti accompagnerà passo dopo passo
            nella scelta del fotografo perfetto per raccontare la vostra storia
            d&apos;amore.
          </p>
        </div>

        {/* GRID (box sinistra + destra) */}
        <div className="mt-12 grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* LEFT: list */}
          <div>
            <ul className="space-y-6">
              {bullets.map((text) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1f3865]">
                    <HiCheck className="h-5 w-5 text-white" />
                  </span>
                  <p className="text-base leading-7 text-slate-900/70 sm:text-lg">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: ebook card */}
          <div className="lg:pt-8">
            <div className="relative overflow-hidden border border-slate-900/10 bg-[#f4eae3] p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full border-2 border-slate-900/10" />

              <p className="text-center text-xs tracking-[0.34em] text-slate-900/45">
                EBOOK GRATUITO
              </p>

              <p className="mt-6 text-center font-serif text-2xl leading-snug text-slate-900/80 sm:text-3xl">
                “L&apos;Arte di Raccontare il <br className="hidden sm:block" />
                Vostro Amore”
              </p>

              <div className="mx-auto mt-6 h-px w-24 bg-[#1f3865]/40" />

              <p className="mt-10 text-center font-serif text-5xl text-[#1f3865]/90">
                30+
              </p>
              <p className="mt-3 text-center text-base text-slate-900/55">
                pagine di contenuti esclusivi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingWhatYouGetSection;
