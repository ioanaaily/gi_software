import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3 className="footer-title">GI Software</h3>
          <p className="footer-text">
            Innovative software solutions for businesses of all sizes.
          </p>
          <div className="company-details">
            <p>Registration No: RO12345678</p>
            <p>Address: Piața Victoriei 1, Bucharest, Romania</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">{t('quickLinks', 'Quick Links')}</h3>
          <ul className="footer-links">
            <li><Link to="/">{t('home')}</Link></li>
            <li><Link to="/about">{t('about')}</Link></li>
            <li><Link to="/services">{t('services')}</Link></li>
            <li><Link to="/contact">{t('contact')}</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">{t('legal', 'Legal')}</h3>
          <ul className="footer-links">
            <li><Link to="/terms-and-conditions">{t('termsOfService')}</Link></li>
            <li><Link to="/privacy-policy">{t('privacyPolicy')}</Link></li>
            <li><Link to="/gdpr">{t('gdprCompliance', 'GDPR Compliance')}</Link></li>
            <li><Link to="/cookie-policy">{t('cookiePolicy', 'Cookie Policy')}</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} GI Software SRL. {t('allRightsReserved')}</p>
        <p className="footer-legal-text">
          {t('byUsingWebsite', 'By using this website, you accept our')} <Link to="/terms-and-conditions">{t('termsOfService')}</Link> {t('and')} 
          <Link to="/privacy-policy"> {t('privacyPolicy')}</Link>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
