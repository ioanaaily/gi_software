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

export default AINews;