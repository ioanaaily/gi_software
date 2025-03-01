import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/about.css";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">{t('aboutUs')}</h1>
        <p className="about-subtitle">{t('deliveringInnovativeSolutions', 'Delivering innovative solutions across Europe and the USA')}</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2 className="section-title">{t('ourMission')}</h2>
          <p className="section-text">
            {t('missionStatement', 'We are a company focused on leveraging the latest technologies to solve complex challenges and drive growth. Our mission is to empower businesses with cutting-edge software solutions that transform operations and create new opportunities.')}
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">{t('ourApproach', 'Our Approach')}</h2>
          <p className="section-text">
            {t('approachStatement', 'Our team delivers scalable, high-performance solutions tailored to each client\'s unique needs. We combine technical expertise with industry knowledge to create software that addresses real-world challenges effectively.')}
          </p>
        </div>
      </div>

      <div className="team-section">
        <h2 className="team-title">{t('technologiesWeUse', 'Technologies We Use')}</h2>
        <div className="about-section">
          <ul className="section-text">
            <li>{t('aiMl', 'Artificial Intelligence (AI) & Machine Learning (ML)')}</li>
            <li>{t('cloudTech', 'Cloud Technologies: AWS, Azure, Google Cloud')}</li>
            <li>{t('devOpsTools', 'Automation & DevOps Tools')}</li>
            <li>{t('backendDev', 'Backend Development: Node.js, Python, .Net')}</li>
            <li>{t('frontendDev', 'Frontend Development: React, Angular, Vue.js')}</li>
            <li>{t('databaseTech', 'Database Technologies: PostgreSQL, MongoDB, SQL')}</li>
            <li>{t('iotIntegration', 'IoT Integration')}</li>
          </ul>

          <div className="buttons" style={{ marginTop: "2rem" }}>
            <Link to="/services" className="button primary">
              {t('exploreServices', 'Explore Services')}
            </Link>
            <Link to="/contact" className="button secondary">
              {t('letsTalk', 'Let\'s Talk')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
