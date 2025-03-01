import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import EmergencyNewsComponent from './components/EmergencyNewsComponent';
import ArticlePage from './pages/ArticlePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Redirect root to AINews */}
            <Route path="/" element={<Navigate to="/news" replace />} />
            
            {/* AI News routes */}
            <Route path="/news" element={<EmergencyNewsComponent />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            
            {/* Add a fallback route */}
            <Route path="*" element={
              <div className="container mx-auto px-4 py-16 text-center">
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
  );
}

export default App;