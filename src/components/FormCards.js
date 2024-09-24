import React from 'react';
import { FaLightbulb, FaHeart, FaShieldAlt, FaChartLine, FaEye, FaHeadphones, FaCrown } from 'react-icons/fa'; // Importa icone da react-icons


const cardsData = [
    {
        title: 'Scegli CREATIVITÀ se...',
        content: `Sei innovativo, sempre alla ricerca di nuove idee e soluzioni. Sei in cerca di avventura. Sei uno sperimentatore, un sostenitore del nuovo. Sei in grado di sviluppare una profusione di idee. Incoraggi gli altri a rompere le abitudini e a provare nuove tecniche...`,
        icon: <FaLightbulb size={30} className="text-yellow-500" />
    },
    {
        title: 'Scegli EMOZIONI se...',
        content: `Ti esprimi con le espressioni facciali animate, il linguaggio del corpo, e con l’intonazione vocale, sei socievole e gregario...`,
        icon: <FaHeart size={30} className="text-red-500" />
    },
    {
        title: 'Scegli AFFIDABILITÀ se...',
        content: `Sei una persona di cui ci si può fidare. Costruisci la tua reputazione nel tempo. Sei costante e concentrato...`,
        icon: <FaShieldAlt size={30} className="text-blue-500" />
    },
    {
        title: 'Scegli ALTI STANDARD se...',
        content: `Ti sforzi di migliorare le tue prestazioni, continuamente ti prefiggi nuovi obiettivi, il tuo scopo personale e professionale è quello di raggiungere l'eccellenza e superare le aspettative...`,
        icon: <FaChartLine size={30} className="text-green-500" />
    },
    {
        title: 'Scegli ATTENZIONE AI DETTAGLI se...',
        content: `Sei vigile, attento ai dettagli, consapevole, con la capacità di gestire progetti complessi. Sei in grado di destreggiarti tra esigenze contrastanti, come il rispetto delle scadenze strette...`,
        icon: <FaEye size={30} className="text-purple-500" />
    },
    {
        title: 'Scegli ASCOLTO/OSSERVO se...',
        content: `Sei un buon ascoltatore e osservatore e pensi bene prima di parlare. Sei intellettuale solista dietro le quinte. Hai la capacità di vedere le sfumature di una situazione...`,
        icon: <FaHeadphones size={30} className="text-teal-500" />
    },
    {
        title: 'Scegli CONTROLLO e LEADERSHIP se...',
        content: `Ti esprimi con sicurezza di sé e autorità. Ispiri gli altri con obiettivi più grandi e opinioni forti. Sai quello che vuoi e spesso conduci la conversazione...`,
        icon: <FaCrown size={30} className="text-yellow-700" />
    },
];

const FormCards = () => {
    return (
        <div className="container mx-auto py-10 px-5 flex flex-col gap-8">
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                    <div className="flex flex-col-reverse items-center mb-4 md:flex-row md:justify-between">
                        <h3 className="text-2xl font-bold text-[#102e5e] text-center md:text-left">
                            {card.title}
                        </h3>
                        <span className="mb-2 md:mb-0">{card.icon}</span> {/* Icona sopra il titolo in modalità mobile */}
                    </div>
                    <p className="text-gray-700">{card.content}</p>
                </div>
            ))}
        </div>
    );
};

export default FormCards;