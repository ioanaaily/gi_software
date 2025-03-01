/**
 * Translation Provider Component for GI Software frontend
 * 
 * This component provides a context for translation functionality
 * It should be placed in the frontend/src/context directory
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../utils/translations';

// Create translation context
const TranslationContext = createContext();

// Translation provider component
export const TranslationProvider = ({ children }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Update HTML lang attribute and localStorage when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  // Toggle between English and Romanian
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ro' : 'en');
  };

  // Translate function to get string by key
  const translate = (key) => {
    // Get translations for current language or default to English
    const currentTranslations = translations[language] || translations.en;
    
    // Return translation or fallback to English or key itself
    return currentTranslations[key] || translations.en[key] || key;
  };

  // Context value
  const contextValue = {
    language,
    setLanguage,
    toggleLanguage,
    t: translate,
    isEnglish: language === 'en',
    isRomanian: language === 'ro',
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook for using translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
};

export default TranslationProvider;