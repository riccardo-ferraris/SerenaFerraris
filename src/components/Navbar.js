import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for Hamburger Menu
import logoBlu from "../assets/images/Logo/logoBlu.png"
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logoBlu} alt="Logo" className="w-24 h-auto" />
        <div className="md:hidden text-[#102e5e]" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        <ul className="hidden md:flex space-x-10 text-white">
          <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold">Home</Link></li>
          {isHomePage && (
            <>
              <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' })}>Chi sono</Link></li>
              <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>Dicono di me</Link></li>
            </>
          )}
          <li><Link to="/contact_form" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>Contattami</Link></li>
          <li><Link to='/gallery' className="text-[#102e5e] hover:text-gray-400 font-bold">Galleria</Link></li>
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden bg-white text-white flex flex-col items-center justify-center space-y-2 p-2">
          <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={toggleMenu}>Home</Link></li>
          {isHomePage && (
            <>
              <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => {document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' }); toggleMenu()}}>Chi sono</Link></li>
              <li><Link to="/" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => {document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); toggleMenu()}}>Dicono di me</Link></li>
            </>
          )}
          <li><Link to="/contact_form" className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={() => {document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); toggleMenu()}}>Contattami</Link></li>
          <li><Link to='/gallery' className="text-[#102e5e] hover:text-gray-400 font-bold" onClick={toggleMenu}>Galleria</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;