/**
 * Translation service for GI Software
 *
 * This file provides translations for static UI elements in the React frontend.
 * Place this file in the frontend/src/utils directory.
 */

// Translation strings for UI elements
const translations = {
  // English translations (default)
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    news: 'AI News',
    services: 'Services',
    login: 'Login',

    // Common UI elements
    readMore: 'Read More',
    submit: 'Submit',
    send: 'Send',
    search: 'Search',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',

    // Footer
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',

    // Contact form
    name: 'Name',
    email: 'Email',
    message: 'Message',
    phone: 'Phone',
    subject: 'Subject',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch',
    messageSent: 'Your message has been sent!',

    // About page
    aboutUs: 'About Us',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourTeam: 'Our Team',
    ourHistory: 'Our History',

    // Services page
    ourServices: 'Our Services',
    serviceDescription: 'Service Description',

    // Admin section
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    manageArticles: 'Manage Articles',
    edit: 'Edit',
    delete: 'Delete',
    logout: 'Logout',
    welcome: 'Welcome',

    // Notifications
    success: 'Success',
    error: 'Error',
    thankYou: 'Thank You',

    // Company specific
    companyName: 'GI Software',
    companyTagline: 'Innovative Solutions for Your Business',
  },

  // Romanian translations
  ro: {
    // Navigation
    home: 'Acasă',
    about: 'Despre',
    contact: 'Contact',
    news: 'Știri AI',
    services: 'Servicii',
    login: 'Autentificare',

    // Common UI elements
    readMore: 'Citește mai mult',
    submit: 'Trimite',
    send: 'Trimite',
    search: 'Caută',
    back: 'Înapoi',
    next: 'Următorul',
    previous: 'Anterior',

    // Footer
    allRightsReserved: 'Toate drepturile rezervate',
    privacyPolicy: 'Politica de confidențialitate',
    termsOfService: 'Termeni și condiții',

    // Contact form
    name: 'Nume',
    email: 'Email',
    message: 'Mesaj',
    phone: 'Telefon',
    subject: 'Subiect',
    yourName: 'Numele dumneavoastră',
    yourEmail: 'Emailul dumneavoastră',
    yourMessage: 'Mesajul dumneavoastră',
    contactUs: 'Contactați-ne',
    getInTouch: 'Luați legătura cu noi',
    messageSent: 'Mesajul dumneavoastră a fost trimis!',

    // About page
    aboutUs: 'Despre noi',
    ourMission: 'Misiunea noastră',
    ourVision: 'Viziunea noastră',
    ourTeam: 'Echipa noastră',
    ourHistory: 'Istoria noastră',

    // Services page
    ourServices: 'Serviciile noastre',
    serviceDescription: 'Descrierea serviciului',

    // Admin section
    adminPanel: 'Panou de administrare',
    dashboard: 'Tablou de bord',
    manageArticles: 'Gestionare articole',
    edit: 'Editează',
    delete: 'Șterge',
    logout: 'Deconectare',
    welcome: 'Bun venit',

    // Notifications
    success: 'Succes',
    error: 'Eroare',
    thankYou: 'Mulțumim',

    // Company specific
    companyName: 'GI Software',
    companyTagline: 'Soluții Inovatoare pentru Afacerea Ta',
  }
};

// Translation hook for use in components
export function useTranslation() {
  // Get language from localStorage or default to English
  const getLanguage = () => localStorage.getItem('language') || 'en';

  // Translate function
  const t = (key) => {
    const language = getLanguage();

    // Return translation or fallback to English or the key itself
    return translations[language]?.[key] ||
           translations.en?.[key] ||
           key;
  };

  return { t, language: getLanguage() };
}

export default translations;