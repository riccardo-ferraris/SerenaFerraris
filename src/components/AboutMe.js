import React from "react";
import about1 from "../assets/images/AboutMe/about1.JPG";
import about2 from "../assets/images/AboutMe/about2.JPG";
import about3 from "../assets/images/AboutMe/about3.JPG";

const aboutSections = [
  {
    title: "Chi sono",
    text: (
      <>
        Mi chiamo <strong>Serena Ferraris</strong> e sono specializzata in
        servizi fotografici in <strong>stile reportage</strong>. <br />I miei
        studi di approfondimento come Counselor Psicobiologico e la mia passione
        per la <strong>psicologia</strong> mi hanno permesso di studiare l'animo
        umano, di capire da cosa è mosso e di comprenderne a fondo le{" "}
        <strong>emozioni</strong> (per esempio, come nascono, quanto durano e
        come si manifestano). Sono riuscita così ad unire le mie due grandi
        passioni, la psicologia e la fotografia, specializzandomi in{" "}
        <strong>fotografia emozionale</strong>.
        <br />
        Mi definisco perciò Emotion Photographer, perché adoro carpire le
        emozioni e le espressioni umane per poi renderle immagini."
      </>
    ),
    image: about1,
  },
  {
    title: "Il mio stile",
    text: (
      <>
        Il reportage è uno <strong>stile discreto</strong> e{" "}
        <strong>non invasivo</strong> che consente di catturare fedelmente{" "}
        <strong>emozioni</strong> ed <strong>espressioni autentiche</strong>.
        Non vi chiederò mai di mettervi in posa, eliminando così il disagio che
        potrebbe crearsi trovandosi davanti all'obiettivo. Al contrario, mi{" "}
        <i>sintonizzerò</i> con le vostre emozioni per poter cogliere
        all'istante ciò che è davvero significativo, per renderlo{" "}
        <strong>indimenticabile</strong>.
      </>
    ),
    image: about2,
  },
  {
    title: "Promessa",
    text: (
      <>
        Prima dello shooting mi dedicherò a te per comprendere quali sono i tuoi{" "}
        <strong>desideri</strong> e <strong>bisogni</strong>. <br />
        Capirò cosa è importante per te, come ti relazioni col mondo e qual è il
        tuo unico e personale modo di esprimere ciò che provi. <br />
        Questo approfondito processo di comprensione mi permetterà di catturare,
        attraverso le foto, le tue emozioni più autentiche, conferendo loro{" "}
        <br />
        <strong>un'essenza eterna</strong>. <br />
        Attraverso l'obiettivo della mia macchina fotografica, tradurrò in foto
        non solo un'espressione ma la tua <strong>intera personalità</strong>.
      </>
    ),
    image: about3,
  },
];

const AboutMe = () => {
  return (
    <section className="py-12 px-8 bg-gray-100">
      <div className="container mx-auto space-y-12">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center`}
          >
            <div className="md:w-1/2">
              <img
                src={section.image}
                alt={`Serena Ferraris - ${section.title}: fotografa matrimoni reportage specializzata in fotografia emozionale`}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 md:pr-8 mt-8 md:mt-0">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#594c47]">
                {section.title}
              </h2>
              <p className="text-[#594c47] text-center">{section.text}</p>
            </div>
          </div>
        ))}
        <div className="text-center px-8">
          <h2 className="text-2xl font-bold mb-4 text-[#594c47]">
            Cos'è il reportage?
          </h2>
          <p className="text-[#594c47] max-w-4xl mx-auto">
            Il reportage è uno <strong>stile discreto</strong> e{" "}
            <strong>non invasivo</strong> che consente di catturare fedelmente
            emozioni ed espressioni autentiche. <br />
            Il termine reportage di matrimonio nasce quindi da un'esigenza
            stilistica: voler prendere le distanze dalla fotografia in posa. Chi
            si avvicina a questo stile, di solito, predilige le{" "}
            <strong>foto spontanee</strong>.
          </p>
          <br />
          <br />
          <h2 className="text-2xl font-bold mb-4 text-[#594c47]">
            Come si arriva a questo risultato?
          </h2>
          <p className="text-[#594c47] max-w-4xl mx-auto">
            Io, in qualità di fotoreporter, non vi chiederò <strong>mai</strong>{" "}
            di mettervi in posa, eliminando così il disagio che potrebbe
            crearsi, trovandosi davanti all'obiettivo. Sarò mescolata tra la
            folla, mantenendo sempre <strong>un'attenzione</strong> e{" "}
            <strong>coinvolgimento massimi</strong>, per essere pronta a
            catturare tutti i momenti importanti.
            <br />
            <br />
            La giornata del matrimonio è una giornata piena di emozioni, a volte
            anche contrastanti: felicità, ansia, nervosismo, eccessiva euforia,
            commozione...
            <br />
            <br />
            Perciò, per cogliere all'istante ciò che è davvero significativo,
            oltre alla capacità tecnica è necessaria una <br />
            <strong>forte componente emotiva ed empatica</strong>
            <br /> che consenta al fotografo di catturare quei sentimenti,
            anticiparli o addirittura incanalarli.
          </p>
          <br />
          <p className="text-[#594c47] max-w-4xl mx-auto">
            In definitiva, negli anni ho consolidato un metodo che permette alle
            coppie non solo di ottenere un <br />
            <strong>servizio fotografico di qualità</strong>, <br />
            ma di vivere una vera e propria{" "}
            <strong>esperienza emozionale</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
