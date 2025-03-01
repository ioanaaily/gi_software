import React from "react";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/terms.css";

function TermsAndConditions() {
  const { t } = useTranslation();
  const lastUpdated = t('lastUpdated', "March 1, 2025");

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">{t('termsAndConditions', 'Terms and Conditions')}</h1>
        <p className="terms-subtitle">{t('lastUpdatedLabel', 'Last Updated')}: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section1', '1. Agreement to Terms')}</h2>
          <p className="section-text">
            {t('terms_section1_text', 'By accessing or using GI Software\'s website, software, or services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.')}
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('terms_section2', '2. Description of Services')}</h2>
          <p className="section-text">
            {t('terms_section2_text', 'GI Software provides custom software development services including but not limited to AI integration, web applications, mobile development, and cloud solutions. Our services are subject to change without notice.')}
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section3', '3. Intellectual Property Rights')}</h2>
          <p className="section-text">
            {t('terms_section3_text', 'All content, features, and functionality on our website and services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by GI Software and are protected by international copyright, trademark, and other intellectual property laws.')}
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section4', '4. User Responsibilities')}</h2>
          <p className="section-text">
            {t('terms_section4_intro', 'When using our services, you agree to:')}
          </p>
          <ul className="section-list">
            <li>{t('terms_responsibility1', 'Provide accurate and complete information')}</li>
            <li>{t('terms_responsibility2', 'Maintain the security of your account')}</li>
            <li>{t('terms_responsibility3', 'Not use our services for any illegal or unauthorized purpose')}</li>
            <li>{t('terms_responsibility4', 'Not interfere with or disrupt our services or servers')}</li>
            <li>{t('terms_responsibility5', 'Comply with all applicable laws and regulations')}</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section5', '5. Limitation of Liability')}</h2>
          <p className="section-text">
            {t('terms_section5_text', 'In no event shall GI Software be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.')}
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section6', '6. Governing Law')}</h2>
          <p className="section-text">
            {t('terms_section6_text', 'These Terms shall be governed and construed in accordance with the laws of Romania, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.')}
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section7', '7. Changes to Terms')}</h2>
          <p className="section-text">
            {t('terms_section7_text', 'We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.')}
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">{t('terms_section8', '8. Contact Information')}</h2>
          <p className="section-text">
            {t('terms_contact_intro', 'If you have any questions about these Terms, please contact us at:')}
          </p>
          <p className="section-text contact-info">
            {t('companyName')}<br />
            {t('registrationNo', 'Registration No: RO12345678')}<br />
            {t('companyAddress', 'Piața Victoriei 1, Bucharest, Romania')}<br />
            {t('companyEmail', 'Email:')} legal@gisoftware.com<br />
            {t('companyPhone', 'Phone:')} +40 700 000 000
          </p>
        </div>
        
        <div className="terms-date">
          {t('effectiveDate', 'Effective Date:')} {t('effectiveDateValue', 'January 1, 2025')}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;