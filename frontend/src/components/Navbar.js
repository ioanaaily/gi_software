import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../context/TranslationProvider";
import LanguageSwitcher from "./language_switcher.js";
import "../styles/navbar.css";

// Use a direct URL instead of env variable to ensure it works
const logoUrl = "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/logo2.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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
        <NavItem to="/about" current={location.pathname}>{t('about')}</NavItem>
        <NavItem to="/services" current={location.pathname}>{t('services')}</NavItem>
        <NavItem to="/ai-news" current={location.pathname}>{t('news')}</NavItem>
        <NavItem to="/contact" current={location.pathname}>{t('contact')}</NavItem>
        <LanguageSwitcher />
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
