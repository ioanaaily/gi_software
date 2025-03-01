import React from "react";
import "../styles/terms.css";  // Reusing terms styling for consistency

function PrivacyPolicy() {
  const lastUpdated = "March 1, 2025";

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">Privacy Policy</h1>
        <p className="terms-subtitle">Last Updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2 className="section-title">1. Introduction</h2>
          <p className="section-text">
            GI Software SRL ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p className="section-text">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">2. Collection of Your Information</h2>
          <p className="section-text">
            We may collect information about you in a variety of ways. The information we may collect via the website includes:
          </p>
          <ul className="section-list">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, telephone number, and other information that you voluntarily give to us when you register with the website or when you contact us.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., bank account details) when you purchase our services. We store only very limited financial information that we need to complete the transaction.</li>
            <li><strong>Mobile Device Data:</strong> Device information, such as your mobile device ID, model, and manufacturer, if you access the website from a mobile device.</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">3. Use of Your Information</h2>
          <p className="section-text">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
          </p>
          <ul className="section-list">
            <li>Create and manage your account</li>
            <li>Process payments and refunds</li>
            <li>Deliver targeted advertising, newsletters, and other information regarding promotions</li>
            <li>Email you regarding your account or order</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
            <li>Increase the efficiency and operation of the website</li>
            <li>Monitor and analyze usage and trends to improve your experience with the website</li>
            <li>Notify you of updates to the website</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity</li>
            <li>Respond to product and customer service requests</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">4. Disclosure of Your Information</h2>
          <p className="section-text">
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className="section-list">
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li><strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">5. Security of Your Information</h2>
          <p className="section-text">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">6. Cookie Policy</h2>
          <p className="section-text">
            We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">7. GDPR Rights</h2>
          <p className="section-text">
            If you are a resident of the European Union, you have certain data protection rights under the GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the following rights:
          </p>
          <ul className="section-list">
            <li>The right to access, update or delete the information we have on you</li>
            <li>The right of rectification</li>
            <li>The right to object</li>
            <li>The right of restriction</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2 className="section-title">8. Contact Information</h2>
          <p className="section-text">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p className="section-text contact-info">
            GI Software SRL<br />
            Registration No: RO12345678<br />
            Piața Victoriei 1, Bucharest, Romania<br />
            Email: privacy@gisoftware.com<br />
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

export default PrivacyPolicy;