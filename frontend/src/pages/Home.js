import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationProvider";
import "../styles/home.css";

function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="content">
      <div className="text-box">
        <h1 className="title">{t('homeTitle', 'Your Tech Partner for the Future')}</h1>
        <p className="tagline">
          {t('homeTagline', 'Innovative AI-Powered Solutions for Modern Business')}
        </p>
        
        <div className="divider"></div>
        
        <p className="description">
          {t('homeDescription', 'We develop custom software solutions that leverage artificial intelligence, cloud computing, and data analytics to help businesses thrive in an increasingly digital world.')}
        </p>
        
        <p className="highlights">
          {t('homeHighlights', 'Our expertise spans machine learning, web applications, mobile development, and enterprise systems integration across Europe and the USA.')}
        </p>
        
        <div className="buttons">
          <Link to="/services" className="button primary">
            {t('exploreServices', 'Explore Services')}
          </Link>
          <Link to="/contact" className="button secondary">
            {t('letsTalk', 'Let\'s Talk')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
