import { React, useState } from "react";
import Slider from "react-slick";
import image1 from "../assets/images/Carousel/carousel1.JPG";
import image2 from "../assets/images/Carousel/carousel2.JPG";
import image3 from "../assets/images/Carousel/carousel3.JPG";
import image4 from "../assets/images/Carousel/carousel4.JPG";
import image5 from "../assets/images/Carousel/carousel5.jpg";
import image6 from "../assets/images/Carousel/carousel6.jpg";

import "../index.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const images = [image1, image2, image3, image4, image5, image6];

// Freccia per la navigazione successiva
const NextArrow = ({ onClick, size }) => {
  return (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#102e5e] text-white p-2 rounded-full cursor-pointer z-10 mr-10"
      onClick={onClick}
    >
      <FaArrowRight size={size} />
    </div>
  );
};

// Freccia per la navigazione precedente
const PrevArrow = ({ onClick, size }) => {
  return (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#102e5e] text-white p-2 rounded-full cursor-pointer z-10 ml-10"
      onClick={onClick}
    >
      <FaArrowLeft size={size} />
    </div>
  );
};

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true, // Mostra i pallini di navigazione
    infinite: true, // Loop infinito
    speed: 500, // Velocità di transizione
    slidesToShow: 1, // Quante immagini mostrare per slide (1 per volta)
    slidesToScroll: 1, // Quante immagini scorrere per volta
    centerMode: true,
    centerPadding: "300px",
    autoplay: true, // Attiva lo scorrimento automatico
    autoplaySpeed: 3000, // Tempo tra una slide e l'altra (3 secondi)
    arrows: true, // Frecce di navigazione
    nextArrow: <NextArrow size={36} />,
    prevArrow: <PrevArrow size={36} />,
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1024, // Schermi medi (tablet)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px", // Riduci il padding su tablet
          nextArrow: <NextArrow size={24} />,
          prevArrow: <PrevArrow size={24} />,
        },
      },
      {
        breakpoint: 768, // Schermi piccoli (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px", // Rimuovi il padding per i dispositivi mobili
          centerMode: false, // Disabilita la modalità centrata su mobile
          nextArrow: <NextArrow size={12} />,
          prevArrow: <PrevArrow size={12} />,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto pt-4 bg-gray-100">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide relative px-6 ${
              index === activeSlide ? "opacity-100" : "opacity-50"
            } transition-opacity duration-10`}
          >
            <img
              src={image}
              alt={`Fotografia matrimonio reportage ${
                index + 1
              } - Serena Ferraris fotografa specializzata in emozioni autentiche`}
              className="w-full md:h-96 lg:h-auto object-cover rounded-lg transition-transform duration-100"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
