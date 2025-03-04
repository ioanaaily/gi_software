import React from 'react';
import SEO from './SEO';
import { Link } from 'react-router-dom';

// Now using Tailwind classes for responsive design instead of inline styles
function EmergencyNewsComponent() {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      <SEO 
        title="AI News - Latest AWS, GCP & Artificial Intelligence Updates"
        description="Stay up-to-date with the latest AWS, Google Cloud Platform, and AI news. Expert analysis on cloud services, machine learning, neural networks, and more."
        keywords="AWS news, GCP news, Google Cloud Platform, Amazon Web Services, cloud computing, AI news, artificial intelligence, machine learning, neural networks, computer vision, NLP, AI breakthroughs, AI research"
        canonical="/news"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        AI & Cloud Technology News
      </h1>
      
      {/* Responsive grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Article Card 1 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              AI Healthcare Breakthroughs
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • Healthcare
            </p>
            <p className="mb-4 text-gray-700">
              New AI models are helping doctors diagnose diseases with greater accuracy.
            </p>
            <Link to="/news/ai-healthcare-breakthroughs" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
        
        {/* Article Card 2 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              AWS Machine Learning Services
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • AWS
            </p>
            <p className="mb-4 text-gray-700">
              How AWS SageMaker is transforming machine learning development in 2025.
            </p>
            <Link to="/news/machine-learning-in-2025" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
        
        {/* Article Card 3 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              Neural Networks Explained
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • Education
            </p>
            <p className="mb-4 text-gray-700">
              A beginner's guide to understanding neural networks.
            </p>
            <Link to="/news/neural-networks-explained" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
        
        {/* Article Card 4 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              Google Cloud AI Ethics
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • GCP
            </p>
            <p className="mb-4 text-gray-700">
              Google Cloud Platform's new ethical AI development guidelines.
            </p>
            <Link to="/news/ai-ethics-guidelines" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
        
        {/* Article Card 5 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              AWS Lambda Advancements
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • AWS
            </p>
            <p className="mb-4 text-gray-700">
              How serverless computing is evolving with AWS Lambda.
            </p>
            <Link to="/news/nlp-breakthroughs" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
        
        {/* Article Card 6 */}
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              GCP Vision API
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              March 1, 2025 • GCP
            </p>
            <p className="mb-4 text-gray-700">
              Google Cloud's Vision API is transforming industries from retail to healthcare.
            </p>
            <Link to="/news/computer-vision-applications" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export default EmergencyNewsComponent;