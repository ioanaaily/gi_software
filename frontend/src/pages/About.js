import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Delivering innovative solutions across Europe and the USA</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            We are a company focused on leveraging the latest technologies to solve complex 
            challenges and drive growth. Our mission is to empower businesses with cutting-edge 
            software solutions that transform operations and create new opportunities.
          </p>
        </div>
        
        <div className="about-section">
          <h2 className="section-title">Our Approach</h2>
          <p className="section-text">
            Our team delivers scalable, high-performance solutions tailored to each client's 
            unique needs. We combine technical expertise with industry knowledge to create 
            software that addresses real-world challenges effectively.
          </p>
        </div>
      </div>
      
      <div className="team-section">
        <h2 className="team-title">Technologies We Use</h2>
        <div className="about-section">
          <ul className="section-text">
            <li>Artificial Intelligence (AI) & Machine Learning (ML)</li>
            <li>Cloud Technologies: AWS, Azure, Google Cloud</li>
            <li>Automation & DevOps Tools</li>
            <li>Backend Development: Node.js, Python, Java</li>
            <li>Frontend Development: React, Angular, Vue.js</li>
            <li>Database Technologies: PostgreSQL, MongoDB, SQL</li>
            <li>IoT Integration</li>
          </ul>
          
          <div className="buttons" style={{ marginTop: "2rem" }}>
            <Link to="/services" className="button primary">
              Explore Services
            </Link>
            <Link to="/contact" className="button secondary">
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
