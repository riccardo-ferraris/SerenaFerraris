import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Footer from "./components/Footer";
import ContactForm from "./pages/ContactForm";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Breadcrumb />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact_form" element={<ContactForm />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
