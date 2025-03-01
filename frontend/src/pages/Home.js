import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="content">
      <div className="text-box">
        <h1 className="title">Your Tech Partner for the Future</h1>
        <p className="tagline">
          Innovative AI-Powered Solutions for Modern Business
        </p>
        
        <div className="divider"></div>
        
        <p className="description">
          We develop custom software solutions that leverage artificial intelligence,
          cloud computing, and data analytics to help businesses thrive in an
          increasingly digital world.
        </p>
        
        <p className="highlights">
          Our expertise spans machine learning, web applications, mobile development, 
          and enterprise systems integration across Europe and the USA.
        </p>
        
        <div className="buttons">
          <Link to="/services" className="button primary">
            Explore Services
          </Link>
          <Link to="/contact" className="button secondary">
            Let's Talk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
