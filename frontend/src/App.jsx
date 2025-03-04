import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import components
import EmergencyNewsComponent from './components/EmergencyNewsComponent';
import ArticlePage from './pages/ArticlePage';
import AINews from './pages/AINews';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Default SEO tags for the entire site - pages will override these */}
          <SEO />
          
          <Navbar />
          {/* Add top padding to account for fixed navbar */}
          <main className="flex-grow pt-16">
            <Routes>
              {/* Redirect root to AINews */}
              <Route path="/" element={<Navigate to="/news" replace />} />
              
              {/* Cloud News routes */}
              <Route path="/news" element={<EmergencyNewsComponent />} />
              <Route path="/news/:slug" element={<ArticlePage />} />
              
              {/* AI News routes with pagination */}
              <Route path="/ai-news" element={<AINews />} />
              <Route path="/ai-news/:id" element={<ArticlePage />} />
              
              {/* Add a fallback route */}
              <Route path="*" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <SEO 
                    title="404 - Page Not Found"
                    description="The page you're looking for doesn't exist."
                    canonical="/404"
                  />
                  <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                  <p className="mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    Return to Home
                  </a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;