import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

function BasicNewsList() {
  const [newsItems, setNewsItems] = useState([]); // Use newsItems as the variable name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount
    
    // Define the fetch function
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        console.log('API response:', response.data);
        
        // Only update state if component is still mounted
        if (isMounted) {
          // Handle the paginated response format from FastAPI
          if (response.data && response.data.items) {
            // The backend returns a paginated format
            setNewsItems(response.data.items || []);
          } else if (Array.isArray(response.data)) {
            // Handle case where response is directly an array
            setNewsItems(response.data);
          } else {
            // Default to empty array for safety
            console.warn('Unexpected response format:', response.data);
            setNewsItems([]);
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        if (isMounted) {
          setError('Failed to load news articles');
          setLoading(false);
          setNewsItems([]); // Initialize to empty array on error
        }
      }
    }
    
    // Call the fetch function
    fetchNews();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

  // Loading state
  if (loading) {
    return <div className="text-center p-8">Loading articles...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  // Empty state
  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold mb-4">AI News</h2>
        <p>No articles available at this time. Please check back later.</p>
      </div>
    );
  }

  // Function to render articles safely (without using direct .map)
  const renderArticles = () => {
    const articleElements = [];
    const itemsToShow = newsItems.slice(0, 6);
    
    for (let i = 0; i < itemsToShow.length; i++) {
      const article = itemsToShow[i];
      articleElements.push(
        <div 
          key={article.id || `article-${i}`} 
          className="bg-white rounded shadow p-4"
        >
          <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {article.published_date && new Date(article.published_date).toLocaleDateString()}
            {article.category && ` • ${article.category}`}
          </p>
          <p className="mb-4">{article.excerpt}</p>
          <a 
            href={`/news/${article.slug || article.id}`} 
            className="text-blue-600 hover:underline"
          >
            Read more →
          </a>
        </div>
      );
    }
    
    return articleElements;
  };

  // Render list of articles
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">AI News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderArticles()}
      </div>
    </div>
  );
}

export default BasicNewsList;