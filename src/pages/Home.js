import AboutMe from "../components/AboutMe";
import Carousel from "../components/Carousel";
import Reviews from "../components/Reviews";
import SEO from "../components/SEO";

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Serena Ferraris Photography",
    description:
      "Fotografa specializzata in matrimoni stile reportage e fotografia emozionale",
    url: "https://serenaferraris.com",
    image: "/logo192.png",
    telephone: "+39-xxx-xxx-xxxx",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Torino",
      addressRegion: "Piemonte",
      addressCountry: "IT",
    },
    serviceType: "Wedding Photography",
    areaServed: ["Piemonte", "Valle d'Aosta", "Lombardia"],
    priceRange: "€€€",
  };

  return (
    <div className="home">
      <SEO
        title="Home"
        description="Serena Ferraris - Emotion Photographer specializzata in matrimoni stile reportage. Cattura le emozioni più autentiche con un approccio discreto e psicologicamente formato."
        keywords="fotografa matrimonio Torino, servizi fotografici reportage, emotion photographer, matrimonio spontaneo, fotografia psicologia"
        url="/"
        structuredData={structuredData}
      />
      <div id="carousel">
        <Carousel />
      </div>
      <div id="about-me">
        <AboutMe />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
    </div>
  );
}

export default Home;
