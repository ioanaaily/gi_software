import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AINews from "./pages/AINews";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

// Background wrapper component for consistent styling across pages
function BackgroundWrapper({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    // Apply background to all pages
    document.body.style.backgroundImage = "url('https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/assets/check4.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    
    // Add a class based on current route
    const routeName = location.pathname.replace('/', '') || 'home';
    document.body.className = ''; // Clear previous classes
    document.body.classList.add(`page-${routeName}`);
    
    // Apply special class for all pages to control footer display
    if (routeName === 'home') {
      document.documentElement.classList.add('home-page');
    } else {
      document.documentElement.classList.remove('home-page');
    }
    
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.className = '';
      document.documentElement.classList.remove('home-page');
    };
  }, [location]);
  
  return children;
}

function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/ai-news" element={<AINews />} />
              <Route path="/ai-news/:id" element={<AINews />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BackgroundWrapper>
    </Router>
  );
}

export default App;