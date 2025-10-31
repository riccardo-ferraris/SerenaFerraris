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
    image: "/logoBlu.svg",
    telephone: "+39-3662015885",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roma e Napoli",
      addressRegion: "Lazio e Campania",
      addressCountry: "IT",
    },
    serviceType: "Wedding Photography",
    areaServed: ["Lazio", "Campania", "Tutta Italia", "Roma", "Napoli"],
    priceRange: "€€€",
  };

  return (
    <div className="home">
      <SEO
        title="Home"
        description="Serena Ferraris - Fotografa di matrimoni in stile reportage con base a Roma e Napoli. Realizzo servizi fotografici autentici e pieni di emozione in tutta Italia."
        keywords="fotografa matrimonio Roma, fotografa matrimonio Napoli, wedding photographer Italia, reportage matrimoniale, emotion photographer, matrimonio spontaneo, fotografia emozionale"
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
