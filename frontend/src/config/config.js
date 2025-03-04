/**
 * Application configuration based on environment
 */

// API configuration
const API_CONFIG = {
  // Development environment
  development: {
    baseURL: 'http://localhost:8000',
    timeout: 10000,
  },
  
  // Production environment 
  production: {
    // If the API is hosted at a different domain:
    // baseURL: 'https://api.your-domain.com',
    
    // If the API is at the same domain:
    baseURL: '',  // Empty string to avoid path duplication
    timeout: 15000,
  },
  
  // Testing environment
  test: {
    baseURL: 'http://localhost:8000',
    timeout: 5000,
  }
};

// Select the appropriate configuration based on environment
const ENV = process.env.NODE_ENV || 'development';
const apiConfig = API_CONFIG[ENV];

// Export the configuration
export default {
  api: apiConfig,
  
  // Add other configuration settings here
  app: {
    name: 'GI Software',
    version: '1.0.0',
    copyrightYear: new Date().getFullYear(),
  },
  
  // Feature flags
  features: {
    enableAdminArea: true,
    enableLogging: ENV !== 'production',
  }
};