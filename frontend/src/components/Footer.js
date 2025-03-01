import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
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
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/gdpr">GDPR Compliance</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} GI Software SRL. All rights reserved.</p>
        <p className="footer-legal-text">
          By using this website, you accept our <Link to="/terms-and-conditions">Terms of Use</Link> and 
          <Link to="/privacy-policy"> Privacy Policy</Link>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
