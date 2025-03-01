import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import { useTranslation } from "../context/TranslationProvider";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/contact/", formData, {
        headers: { "Content-Type": "application/json" }
      });
      if (response.data.success) {
        setSubmitted(true);
      } else {
        alert(t('contactSendFailed', 'Failed to send message. Try again.'));
      }
    } catch (error) {
      console.error("Error submitting contact form", error);
      alert(t('contactError', 'An error occurred. Please try again later.'));
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="contact-title">{t('getInTouch')}</h1>
          <p className="contact-description">
            {t('contactIntro', 'We\'d love to hear from you. Fill out the form and our team will get back to you as soon as possible.')}
          </p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-icon">📍</span>
              <span>{t('companyLocation', 'Cluj-Napoca, Romania')}</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-icon">📞</span>
              <span>{t('companyPhoneNumber', '+40 741 038 892')}</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-icon">✉️</span>
              <span>{t('companyEmailAddress', 'igioana.ghita@gmail.com')}</span>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <h2>{t('thankYou')}</h2>
              <p>{t('messageSent')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('message')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required className="form-textarea" rows="3"></textarea>
              </div>
              <button type="submit" className="contact-button">{t('send')}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
