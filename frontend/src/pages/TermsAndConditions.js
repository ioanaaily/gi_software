import React from "react";
import "../styles/terms.css";

function TermsAndConditions() {
  const lastUpdated = "March 1, 2025";

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-subtitle">Last Updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2 className="section-title">1. Agreement to Terms</h2>
          <p className="section-text">
            By accessing or using GI Software's website, software, or services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">2. Description of Services</h2>
          <p className="section-text">
            GI Software provides custom software development services including but not limited to AI integration, web applications, mobile development, and cloud solutions. Our services are subject to change without notice.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">3. Intellectual Property Rights</h2>
          <p className="section-text">
            All content, features, and functionality on our website and services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by GI Software and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">4. User Responsibilities</h2>
          <p className="section-text">
            When using our services, you agree to:
          </p>
          <ul className="section-list">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
            <li>Not interfere with or disrupt our services or servers</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">5. Limitation of Liability</h2>
          <p className="section-text">
            In no event shall GI Software be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">6. Governing Law</h2>
          <p className="section-text">
            These Terms shall be governed and construed in accordance with the laws of Romania, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">7. Changes to Terms</h2>
          <p className="section-text">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">8. Contact Information</h2>
          <p className="section-text">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="section-text contact-info">
            GI Software SRL<br />
            Registration No: RO12345678<br />
            Piața Victoriei 1, Bucharest, Romania<br />
            Email: legal@gisoftware.com<br />
            Phone: +40 700 000 000
          </p>
        </div>
        
        <div className="terms-date">
          Effective Date: January 1, 2025
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;