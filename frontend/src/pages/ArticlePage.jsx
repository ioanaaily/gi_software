import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import SEO from '../components/SEO';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        
        // Check if slug is numeric (for AI News) or string (for regular news)
        const isNumeric = /^\d+$/.test(slug);
        
        let response;
        if (isNumeric) {
          // AI News uses numeric IDs
          response = await api.get(`/api/news/article/${slug}`);
        } else {
          // Regular news uses string slugs
          response = await api.get(`/api/news/slug/${slug}`);
        }
        
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
  if (error) return (
    <>
      <SEO 
        title="Error - Article Not Found"
        description="There was an error loading the requested article."
        canonical="/error"
      />
      <div className="text-center py-8 text-red-600">{error}</div>
    </>
  );
  if (!article) return (
    <>
      <SEO 
        title="Article Not Found"
        description="The requested article could not be found."
        canonical="/not-found"
      />
      <div className="text-center py-8">Article not found</div>
    </>
  );

  return (
    <article className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
      {/* SEO for this specific article */}
      <SEO 
        title={article.title}
        description={article.excerpt}
        keywords={`${article.category}, AWS, GCP, Google Cloud Platform, Amazon Web Services, cloud computing, ${article.title.toLowerCase()}`}
        canonical={`/news/${slug}`}
        ogType="article"
        ogImage={article.image_url || '/default-article-image.jpg'}
        article={article}
      />
      
      {/* Back button */}
      <Link to="/news" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 font-medium">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Articles
      </Link>
      
      {/* Article header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">
        {article.title}
      </h1>
      
      {/* Article metadata - stacked on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-5 sm:mb-6 space-y-2 sm:space-y-0">
        <span className="text-sm sm:mr-3">
          {new Date(article.published_date).toLocaleDateString()}
        </span>
        {article.category && (
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold w-fit">
            {article.category}
          </span>
        )}
      </div>
      
      {/* Featured image with responsive sizing */}
      {article.image_url && (
        <div className="mb-6 sm:mb-8">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-auto rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Article excerpt - displayed as a lead paragraph with responsive text sizing */}
      <div className="text-lg sm:text-xl font-medium text-gray-700 mb-6 sm:mb-8 leading-relaxed">
        {article.excerpt}
      </div>
      
      {/* Article content with responsive typography */}
      <div className="prose prose-base sm:prose-lg max-w-none text-gray-800 space-y-4 sm:space-y-6">
        {/* For a real implementation, you'd want to use a rich text renderer here */}
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </div>
      
      {/* Related articles section - only visible on wider screens */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Related Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/news/aws-machine-learning-services" className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <h3 className="font-medium text-lg mb-2">AWS Machine Learning Services</h3>
            <p className="text-gray-600 text-sm">How AWS SageMaker is transforming machine learning development.</p>
          </Link>
          <Link to="/news/gcp-vision-api" className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <h3 className="font-medium text-lg mb-2">GCP Vision API</h3>
            <p className="text-gray-600 text-sm">Google Cloud's Vision API is transforming industries.</p>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;