/**
 * Language Switcher Component for GI Software frontend
 * 
 * This component provides a toggle between English and Romanian languages.
 * It should be placed in the frontend/src/components directory.
 */

import React, { useState, useEffect } from 'react';
import './language-switcher.css'; // Create this CSS file for styling

const LanguageSwitcher = () => {
  // Get initial language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  // Toggle between English and Romanian
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ro' : 'en';
    setLanguage(newLang);
    
    // Reload the page to apply language change
    // In a more advanced implementation, you might use a context provider
    // instead of reloading the page
    window.location.reload();
  };

  return (
    <div className="language-switcher">
      <button 
        onClick={toggleLanguage}
        className="language-toggle-btn"
        aria-label={`Switch to ${language === 'en' ? 'Romanian' : 'English'}`}
      >
        {language === 'en' ? 'RO' : 'EN'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;