import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const pageSize = 6; // Maximum 6 articles per page

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Use the new pagination API
        const response = await axios.get(`/api/news?page=${currentPage}&size=${pageSize}`);
        
        // The API now returns paginated data with metadata
        setArticles(response.data.items);
        setTotalPages(response.data.pages);
        setTotalArticles(response.data.total);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news articles');
        setLoading(false);
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, [currentPage]); // Re-fetch when page changes

  const handlePageChange = (newPage) => {
    // Ensure page is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <div className="text-center py-8">Loading articles...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI News</h1>
      
      {/* Articles count */}
      <p className="text-gray-600 mb-6">
        Showing {articles.length} of {totalArticles} articles
      </p>
      
      {/* Articles grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.image_url && (
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(article.published_date).toLocaleDateString()}
                {article.category && ` • ${article.category}`}
              </p>
              <p className="text-gray-700 mb-4">{article.excerpt}</p>
              <a href={`/news/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md border ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border-t border-b ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-r-md border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewsPage;