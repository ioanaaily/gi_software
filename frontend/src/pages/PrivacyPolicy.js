import React from "react";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/terms.css";  // Reusing terms styling for consistency

function PrivacyPolicy() {
  const { t } = useTranslation();
  const lastUpdated = t('lastUpdated', "March 1, 2025");

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">{t('privacyPolicy')}</h1>
        <p className="terms-subtitle">{t('lastUpdatedLabel', 'Last Updated')}: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section1', '1. Introduction')}</h2>
          <p className="section-text">
            {t('privacy_section1_text1', 'GI Software SRL ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.')}
          </p>
          <p className="section-text">
            {t('privacy_section1_text2', 'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.')}
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section2', '2. Collection of Your Information')}</h2>
          <p className="section-text">
            {t('privacy_section2_intro', 'We may collect information about you in a variety of ways. The information we may collect via the website includes:')}
          </p>
          <ul className="section-list">
            <li><strong>{t('privacy_personal_data', 'Personal Data')}:</strong> {t('privacy_personal_data_desc', 'Personally identifiable information, such as your name, email address, telephone number, and other information that you voluntarily give to us when you register with the website or when you contact us.')}</li>
            <li><strong>{t('privacy_derivative_data', 'Derivative Data')}:</strong> {t('privacy_derivative_data_desc', 'Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.')}</li>
            <li><strong>{t('privacy_financial_data', 'Financial Data')}:</strong> {t('privacy_financial_data_desc', 'Financial information, such as data related to your payment method (e.g., bank account details) when you purchase our services. We store only very limited financial information that we need to complete the transaction.')}</li>
            <li><strong>{t('privacy_mobile_data', 'Mobile Device Data')}:</strong> {t('privacy_mobile_data_desc', 'Device information, such as your mobile device ID, model, and manufacturer, if you access the website from a mobile device.')}</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section3', '3. Use of Your Information')}</h2>
          <p className="section-text">
            {t('privacy_section3_intro', 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:')}
          </p>
          <ul className="section-list">
            <li>{t('privacy_use1', 'Create and manage your account')}</li>
            <li>{t('privacy_use2', 'Process payments and refunds')}</li>
            <li>{t('privacy_use3', 'Deliver targeted advertising, newsletters, and other information regarding promotions')}</li>
            <li>{t('privacy_use4', 'Email you regarding your account or order')}</li>
            <li>{t('privacy_use5', 'Fulfill and manage purchases, orders, payments, and other transactions')}</li>
            <li>{t('privacy_use6', 'Increase the efficiency and operation of the website')}</li>
            <li>{t('privacy_use7', 'Monitor and analyze usage and trends to improve your experience with the website')}</li>
            <li>{t('privacy_use8', 'Notify you of updates to the website')}</li>
            <li>{t('privacy_use9', 'Prevent fraudulent transactions, monitor against theft, and protect against criminal activity')}</li>
            <li>{t('privacy_use10', 'Respond to product and customer service requests')}</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section4', '4. Disclosure of Your Information')}</h2>
          <p className="section-text">
            {t('privacy_section4_intro', 'We may share information we have collected about you in certain situations. Your information may be disclosed as follows:')}
          </p>
          <ul className="section-list">
            <li><strong>{t('privacy_disclosure1_title', 'By Law or to Protect Rights')}:</strong> {t('privacy_disclosure1_desc', 'If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.')}</li>
            <li><strong>{t('privacy_disclosure2_title', 'Third-Party Service Providers')}:</strong> {t('privacy_disclosure2_desc', 'We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.')}</li>
            <li><strong>{t('privacy_disclosure3_title', 'Marketing Communications')}:</strong> {t('privacy_disclosure3_desc', 'With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.')}</li>
            <li><strong>{t('privacy_disclosure4_title', 'Business Transfers')}:</strong> {t('privacy_disclosure4_desc', 'We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.')}</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section5', '5. Security of Your Information')}</h2>
          <p className="section-text">
            {t('privacy_section5_text', 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.')}
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section6', '6. Cookie Policy')}</h2>
          <p className="section-text">
            {t('privacy_section6_text', 'We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.')}
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section7', '7. GDPR Rights')}</h2>
          <p className="section-text">
            {t('privacy_section7_intro', 'If you are a resident of the European Union, you have certain data protection rights under the GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the following rights:')}
          </p>
          <ul className="section-list">
            <li>{t('privacy_gdpr1', 'The right to access, update or delete the information we have on you')}</li>
            <li>{t('privacy_gdpr2', 'The right of rectification')}</li>
            <li>{t('privacy_gdpr3', 'The right to object')}</li>
            <li>{t('privacy_gdpr4', 'The right of restriction')}</li>
            <li>{t('privacy_gdpr5', 'The right to data portability')}</li>
            <li>{t('privacy_gdpr6', 'The right to withdraw consent')}</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="section-title">{t('privacy_section8', '8. Contact Information')}</h2>
          <p className="section-text">
            {t('privacy_contact_intro', 'If you have questions or comments about this Privacy Policy, please contact us at:')}
          </p>
          <p className="section-text contact-info">
            {t('companyName')}<br />
            {t('registrationNo', 'Registration No: RO47861732')}<br />
            {t('companyAddress', 'Cluj-Napoca, Romania')}<br />
            {t('companyEmail', 'Email:')} igioana.ghita@gmail.com <br />
            {t('companyPhone', 'Phone:')} +40 741 038 892
          </p>
        </div>

        <div className="terms-date">
          {t('effectiveDate', 'Effective Date:')} {t('effectiveDateValue', 'January 1, 2025')}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;