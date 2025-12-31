import {
  HiOutlineHeart,
  HiOutlineCamera,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from "react-icons/hi2";

const items = [
  {
    title: "Coppie in procinto di sposarsi",
    desc: "Stai organizzando il matrimonio e vuoi capire come avere foto che raccontino davvero la vostra storia",
    icon: HiOutlineHeart,
  },
  {
    title: "Chi cerca un fotografo",
    desc: "Vuoi sapere cosa cercare in un fotografo di matrimonio e come riconoscere lo stile reportage emozionale",
    icon: HiOutlineCamera,
  },
  {
    title: "Chi ama i momenti autentici",
    desc: "Preferisci le foto spontanee e naturali rispetto alle pose costruite e agli scatti impostati",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Chi vuole rivivere le emozioni",
    desc: "Desideri un album che ti faccia rivivere la giornata ogni volta, con immagini vere e piene di significato",
    icon: HiOutlineSparkles,
  },
];

const LandingAudienceSection = () => {
  return (
    <section
      className="bg-gray-100 px-5 py-14 sm:px-10 sm:py-20"
      aria-label="A chi è dedicato"
    >
      <div className="mx-auto max-w-5xl">
        {/* Head */}
        <div className="text-center">
          <p className="text-xs tracking-[0.28em] text-slate-900/50 sm:text-sm">
            A CHI È DEDICATO
          </p>

          <h2 className="mt-4 font-serif text-[clamp(30px,4vw,48px)] leading-tight text-slate-900/85">
            Questa guida è per <span className="italic">te</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-900/55 sm:text-lg">
            Se ti riconosci in almeno una di queste situazioni, questa guida ti
            aiuterà a fare la scelta giusta
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          {items.map((it) => (
            <div
              key={it.title}
              className="flex items-center gap-5 border border-slate-900/10 bg-white/30 p-6 sm:p-8"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe6df]">
                <it.icon className="h-7 w-7 text-slate-900/70" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-slate-900/80 sm:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-900/55">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingAudienceSection;
