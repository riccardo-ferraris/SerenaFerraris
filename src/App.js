import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/contact_form' element={<ContactForm/>}/>
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;