import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";

function Contact() {
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
        alert("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-description">
            We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-icon">📍</span>
              <span>Cluj-Napoca, Romania</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-icon">📞</span>
              <span>+40 741 038 892</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-icon">✉️</span>
              <span>igioana.ghita@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required className="form-textarea" rows="3"></textarea>
              </div>
              <button type="submit" className="contact-button">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
