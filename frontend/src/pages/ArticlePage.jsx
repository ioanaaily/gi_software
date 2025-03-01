import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/news/slug/${slug}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article');
        setLoading(false);
        console.error('Error fetching article:', err);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading article...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!article) return <div className="text-center py-8">Article not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link to="/news" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Articles
      </Link>
      
      {/* Article header */}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center text-gray-600 mb-6">
        <span className="mr-3">{new Date(article.published_date).toLocaleDateString()}</span>
        {article.category && (
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
            {article.category}
          </span>
        )}
      </div>
      
      {/* Featured image */}
      {article.image_url && (
        <div className="mb-8">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      
      {/* Article excerpt - displayed as a lead paragraph */}
      <div className="text-xl font-medium text-gray-700 mb-8">
        {article.excerpt}
      </div>
      
      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        {/* For a real implementation, you'd want to use a rich text renderer here */}
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;