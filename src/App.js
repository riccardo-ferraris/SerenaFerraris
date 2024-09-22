import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;