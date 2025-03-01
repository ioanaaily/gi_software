import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

// Use a direct URL instead of env variable to ensure it works
const logoUrl = "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for transparent to solid background transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <img src={logoUrl} alt="GI Software Logo" className="logo-image" />
        <Link to="/" className="logo-text">
          GI SOFTWARE
        </Link>
      </div>
      <div className="navbar-links">
        <NavItem to="/about" current={location.pathname}>About</NavItem>
        <NavItem to="/services" current={location.pathname}>Services</NavItem>
        <NavItem to="/ai-news" current={location.pathname}>AI News</NavItem>
        <NavItem to="/contact" current={location.pathname}>Contact</NavItem>
        <NavItem to="/admin" current={location.pathname}>Admin</NavItem>
      </div>
    </nav>
  );
}

const NavItem = ({ to, current, children }) => (
  <Link
    to={to}
    className={`nav-link ${current === to ? 'active' : ''}`}
  >
    {children}
  </Link>
);

export default Navbar;
