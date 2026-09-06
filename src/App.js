import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Footer from "./components/Footer";
import ContactForm from "./pages/ContactForm";
import LandingPage from "./pages/LandingPage";

import WeddingPremiere from "./pages/WeddingPremiere";

function SiteLayout() { return <><Navbar /><Breadcrumb /><Outlet /><Footer /></>; }

function EventRoute() {
  const { slug } = useParams();
  return <WeddingPremiere key={slug} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:slug" element={<EventRoute />} />
        <Route element={<SiteLayout />}>
        <Route path="/" exact element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact_form" element={<ContactForm />} />
        <Route path="/landing" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
