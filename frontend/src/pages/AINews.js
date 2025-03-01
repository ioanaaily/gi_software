import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "../styles/news.css";

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
        const response = await api.get(`/api/news/?page=${currentPage}&size=6`);
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
        setError("Failed to load AI news. Please try again later.");
        setLoading(false);
        
        // Fallback to demo data if API fails (remove in production)
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

// Demo data to show while developing - remove in production
const demoNewsItems = [
  {
    id: 1,
    title: "OCR LLMs: Revolutionizing Document Processing for Small Businesses",
    excerpt: "New OCR technology powered by large language models can extract and understand document content with unprecedented accuracy, saving hours of manual data entry.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/ocr-llm.jpg",
    published_date: "2025-02-15T10:30:00Z",
    category: "Document Processing"
  },
  {
    id: 2,
    title: "AI-Driven Customer Service Tools That Small Businesses Can Afford",
    excerpt: "New generation of AI chatbots are becoming accessible for smaller companies, providing 24/7 support without breaking the bank.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/customer-service-ai.jpg",
    published_date: "2025-02-10T14:45:00Z",
    category: "Customer Support"
  },
  {
    id: 3,
    title: "Small Business AI: Predictive Analytics Without Data Scientists",
    excerpt: "New tools allow small businesses to leverage their existing data for predictive insights without needing specialized data science teams.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/predictive-analytics.jpg",
    published_date: "2025-02-05T09:15:00Z",
    category: "Analytics"
  },
  {
    id: 4,
    title: "AI-Powered Inventory Management: Cutting Costs for Retail SMEs",
    excerpt: "Artificial intelligence is transforming how small retailers manage inventory, reducing waste and optimizing stock levels automatically.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/inventory-ai.jpg",
    published_date: "2025-01-28T11:20:00Z",
    category: "Retail"
  },
  {
    id: 5,
    title: "Generative AI for Content Creation: A Game-Changer for Marketing Teams",
    excerpt: "Small marketing teams can now produce more content with less effort using new generative AI tools specifically designed for business use cases.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/content-generation.jpg",
    published_date: "2025-01-20T16:00:00Z",
    category: "Marketing"
  },
  {
    id: 6,
    title: "Low-Code AI: Building Smart Applications Without Deep Technical Skills",
    excerpt: "New low-code platforms are incorporating AI capabilities, enabling businesses to create intelligent applications with minimal programming knowledge.",
    content: "Full article content here...",
    image_url: "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/low-code-ai.jpg",
    published_date: "2025-01-15T13:10:00Z",
    category: "Development"
  }
];

export default AINews;