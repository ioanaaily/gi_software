import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './language_switcher';
import { useTranslation } from '../utils/translations';

const Navbar = () => {
  // Get translations
  const { t } = useTranslation();
  // Get current location to highlight active menu item
  const location = useLocation();
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for scroll position to add glass effect
  const [scrolled, setScrolled] = useState(false);
  // State to track screen width - forcing mobile view for demonstration
  const [isMobile, setIsMobile] = useState(true);

  // Handle resize events to determine if mobile view should be shown
  useEffect(() => {
    // Force mobile view by setting isMobile to always true
    setIsMobile(true);
    
    // If we want to restore automatic detection later:
    // const handleResize = () => {
    //   setIsMobile(window.innerWidth < 1024);
    //   if (window.innerWidth >= 1024) {
    //     setIsMobileMenuOpen(false);
    //   }
    // };
    // window.addEventListener('resize', handleResize);
    // handleResize();
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add glass effect when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu with animation
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Is the path active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Menu items - centralized for both desktop and mobile
  const menuItems = [
    { path: '/news', label: t('news') },
    { path: '/aws-services', label: t('aws') },
    { path: '/gcp-services', label: t('gcp') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/logo2.png" 
                alt="GI Software Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold text-blue-600">GI Software</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links - Only visible on desktop (lg and up) */}
          {!isMobile && (
            <div className="flex space-x-2 xl:space-x-4">
              {menuItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`px-3 py-2 rounded-md text-sm xl:text-base transition-colors duration-200
                    ${isActive(item.path) 
                      ? 'text-blue-600 bg-blue-50 font-medium' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
          )}
          
          {/* Mobile menu button - Only visible on mobile (below lg) */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 z-50"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : 'mb-1.5'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0' : 'mb-1.5'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu - Full screen overlay */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-white/95 backdrop-blur-sm transition-all duration-500 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '64px' }} // Below the navbar
        >
          <div className="flex flex-col justify-start items-center h-full pt-6 pb-20 overflow-y-auto">
            {/* Menu items with animation */}
            {menuItems.map((item, index) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`w-4/5 text-center py-4 my-1 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher in mobile menu with animation */}
            <div className={`mt-6 transition-all duration-500 transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              <LanguageSwitcher />
            </div>
            
            {/* Social links */}
            <div className={`mt-auto flex space-x-6 py-6 transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`} style={{ transitionDelay: '450ms' }}>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;