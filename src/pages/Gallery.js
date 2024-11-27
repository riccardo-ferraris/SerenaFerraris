import React from 'react';
import image1 from "../assets/images/Gallery/compressed/gallery1 cmpd.jpg"
import image2 from "../assets/images/Gallery/compressed/gallery2 cmpd.jpg"
import image3 from "../assets/images/Gallery/compressed/gallery3 cmpd.jpg"
//import image4 from "../assets/images/Gallery/compressed/gallery4 cmpd.jpg"
import image5 from "../assets/images/Gallery/compressed/gallery5 cmpd.jpg"
import image6 from "../assets/images/Gallery/compressed/gallery6 cmpd.jpg"
import image7 from "../assets/images/Gallery/compressed/gallery7 cmpd.jpg"
//import image8 from "../assets/images/Gallery/compressed/gallery8 cmpd.jpg"
import image9 from "../assets/images/Gallery/compressed/gallery9 cmpd.jpg"

const images = [
  image1,
  image2,
  image3,
  // image4, 
  image5,
  image6,
  image7,
  // image8, 
  image9,
];

const Gallery = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={image}
                alt={`Scatto ${index + 1}`}
                className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;