import { useState } from "react";
import SEO from "../components/SEO";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context(
    "../assets/images/Gallery/compressed",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Gallery Fotografica - Serena Ferraris",
    description:
      "Raccolta dei migliori scatti di matrimoni in stile reportage di Serena Ferraris",
    url: "https://serenaferraris.com/gallery",
    creator: {
      "@type": "Person",
      name: "Serena Ferraris",
      jobTitle: "Fotografa",
      url: "https://serenaferraris.com",
    },
  };

  return (
    <>
      <SEO
        title="Gallery Fotografica"
        description="Scopri la gallery di Serena Ferraris con i migliori scatti di matrimoni in stile reportage. Fotografie emozionali che catturano momenti autentici e spontanei."
        keywords="gallery fotografica matrimoni, foto matrimonio reportage, portfolio fotografo matrimoni, foto spontanee matrimonio, esempi fotografia reportage"
        url="/gallery"
        type="website"
        structuredData={structuredData}
      />
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-5 lg:px-0">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#594c47] mb-4">
              Gallery Fotografica
            </h1>
            <p className="text-lg text-[#594c47] max-w-2xl mx-auto">
              Scopri una selezione dei migliori scatti di matrimoni in stile
              reportage. Ogni foto racconta un'emozione autentica e un momento
              unico.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Fotografia matrimonio reportage ${
                    index + 1
                  } - Serena Ferraris photographer`}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <button
              className="absolute top-5 right-8 text-white text-4xl font-bold hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <img
              src={selectedImage}
              alt="Fotografia matrimonio reportage ingrandita - Serena Ferraris"
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
