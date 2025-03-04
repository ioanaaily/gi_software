import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "../styles/news.css";

// Fallback demo news items for development and error handling
const demoNewsItems = [
  {
    id: 1,
    title: "AWS Lambda Now Supports 10GB Memory Allocation",
    category: "AWS",
    published_date: "2025-03-01",
    excerpt: "Amazon Web Services has increased Lambda function memory limits to 10GB, enabling more powerful serverless applications.",
    image_url: "https://via.placeholder.com/600x400?text=AWS+Lambda"
  },
  {
    id: 2,
    title: "Google Cloud Introduces New AI Infrastructure",
    category: "GCP",
    published_date: "2025-02-28",
    excerpt: "Google Cloud Platform has launched specialized VM instances optimized for machine learning workloads with enhanced TPU integration.",
    image_url: "https://via.placeholder.com/600x400?text=Google+Cloud+AI"
  },
  {
    id: 3,
    title: "AWS SageMaker Adds Auto-Scaling Features",
    category: "AWS",
    published_date: "2025-02-25",
    excerpt: "Amazon SageMaker now includes intelligent auto-scaling for ML model training and inference based on workload patterns.",
    image_url: "https://via.placeholder.com/600x400?text=AWS+SageMaker"
  },
  {
    id: 4,
    title: "GCP Vertex AI Enhances NLP Capabilities",
    category: "GCP",
    published_date: "2025-02-20",
    excerpt: "Google's Vertex AI platform now supports advanced natural language processing features with improved multilingual support.",
    image_url: "https://via.placeholder.com/600x400?text=GCP+Vertex+AI"
  },
  {
    id: 5,
    title: "AWS Introduces Quantum Computing Service",
    category: "AWS",
    published_date: "2025-02-15",
    excerpt: "Amazon Web Services announces a new quantum computing service for businesses to explore quantum algorithms and solutions.",
    image_url: "https://via.placeholder.com/600x400?text=AWS+Quantum"
  },
  {
    id: 6,
    title: "Google Cloud Run Adds WebSocket Support",
    category: "GCP",
    published_date: "2025-02-10",
    excerpt: "Google Cloud Run now supports WebSockets for real-time communication in serverless applications with automatic scaling.",
    image_url: "https://via.placeholder.com/600x400?text=GCP+Cloud+Run"
  }
];

function AINews() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Fetch news data from backend
    const fetchNews = async () => {
      try {
        // Include pagination parameters in the request
        console.log(`Fetching news page ${currentPage}`);
        
        // Log API base URL for debugging
        console.log("API Base URL:", api.defaults.baseURL);
        
        // Try both with and without trailing slash
        const endpoint = `/api/news?page=${currentPage}&size=6`;
        console.log(`Requesting from: ${endpoint}`);
        
        const response = await api.get(endpoint);
        console.log("API Response:", response.data);

        // Handle paginated response format
        if (response.data && response.data.items) {
          setNewsItems(response.data.items);
          setTotalPages(response.data.pages || 1);
          setTotalItems(response.data.total || 0);
          console.log(`Got ${response.data.items.length} articles from ${response.data.total} total`);
        } else if (Array.isArray(response.data)) {
          // Fallback for old API format
          setNewsItems(response.data);
          setTotalPages(1);
          setTotalItems(response.data.length);
        } else {
          console.warn("Unexpected API response format:", response.data);
          setNewsItems([]);
          setTotalPages(1);
          setTotalItems(0);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        // More detailed error message for debugging
        const errorMessage = err.response ? 
          `Error: ${err.response.status} - ${err.response.statusText}` :
          `Network Error: ${err.message}`;
        setError(`Failed to load news: ${errorMessage}`);
        setLoading(false);

        // Log more detailed error info
        if (err.response) {
          console.log("Error Response Data:", err.response.data);
          console.log("Error Response Status:", err.response.status);
          console.log("Error Response Headers:", err.response.headers);
        } else if (err.request) {
          console.log("Error Request:", err.request);
        }

        // Fallback to demo data if API fails (keep for better UX)
        setNewsItems(demoNewsItems);
        setTotalPages(1);
        setTotalItems(demoNewsItems.length);
      }
    };

    fetchNews();
  }, [currentPage]); // Re-fetch when page changes

  return (
    <div className="news-container">
      <div className="news-header">
        <h1 className="news-title">AI Innovation News</h1>
        <p className="news-subtitle">
          Latest AI advancements and tools to help small and medium businesses grow
        </p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading news...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {totalItems > 0 && (
            <div className="news-pagination-info">
              Showing page {currentPage} of {totalPages} ({totalItems} total articles)
            </div>
          )}

          <div className="news-grid">
            {Array.isArray(newsItems) && newsItems.length > 0 ? (
              newsItems.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))
            ) : (
              <div className="no-news-message">No news articles available at this time.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="page-button prev"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="page-button next"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function NewsCard({ news }) {
  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="news-card">
      {news.image_url && (
        <div className="news-image">
          <img src={news.image_url} alt={news.title} />
        </div>
      )}
      <div className="news-content">
        <h2 className="news-card-title">{news.title}</h2>
        <div className="news-meta">
          <span className="news-date">{formatDate(news.published_date)}</span>
          {news.category && <span className="news-category">{news.category}</span>}
        </div>
        <p className="news-excerpt">{news.excerpt}</p>
        <div className="news-cta">
          <a href={`/ai-news/${news.id}`} className="news-read-more">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default AINews;