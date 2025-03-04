/**
 * Language Switcher Component for GI Software frontend
 * 
 * This component provides a toggle between English and Romanian languages.
 * Uses Tailwind CSS for styling instead of separate CSS file.
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/translations';

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
    <div className="inline-flex items-center ml-2">
      <button 
        onClick={toggleLanguage}
        className="bg-blue-50 border border-blue-200 rounded text-blue-600 
                  cursor-pointer text-sm font-semibold py-1 px-2.5 transition-all duration-200
                  hover:bg-blue-100 hover:border-blue-300 hover:shadow-sm
                  md:text-sm md:py-1.5 md:px-3"
        aria-label={`Switch to ${language === 'en' ? 'Romanian' : 'English'}`}
      >
        {language === 'en' ? 'RO' : 'EN'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;