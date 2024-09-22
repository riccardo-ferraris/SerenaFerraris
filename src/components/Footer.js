import React from 'react';
import { FaInstagram, FaRegHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-[#102e5e] py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Sezione contatti */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contatti</h3>
          <p>Indirizzo: Via Enrico Carillo 9/4, San Giuseppe Vesuviano 80047, NA</p>
          <p>Email: serenafer94@gmail.com</p>
          <p>Telefono: +39 379 196 42 74</p>
        </div>

        {/* Sezione Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Seguimi sui Social</h3>
          <div className="flex flex-col md:items-start items-center space-y-3">
            <a href="https://www.instagram.com/serenaferrarisphotography?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="inline-flex item-center space-x-2 text-[#102e5e] hover:text-pink-500"><FaInstagram size={24} /><span>Instagram</span></a>
            <a href="https://www.matrimonio.com/fotografo-matrimonio/serena-ferraris--e388305" className="inline-flex item-center space-x-2 text-[#102e5e] hover:text-red-500"><FaRegHeart size={24} /><span>matrimonio.com</span></a>
          </div>
        </div>

        {/* Sezione Copyright */}
        <div>
          <h3 className="text-lg font-bold mb-4">Informazioni Legali</h3>
          <p><a href="#home" className="hover:text-gray-400">Termini di servizio</a></p>
          <p><a href="#home" className="hover:text-gray-400">Privacy Policy</a></p>
        </div>
      </div>
      {/* Copyright generale e link ai social */}
      <div className="mt-8 text-center">
        <p>© 2024 Serena Ferraris. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;