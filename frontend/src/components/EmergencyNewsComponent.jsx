import React from 'react';
import SEO from './SEO';

// The simplest possible component that doesn't use any dynamic data
function EmergencyNewsComponent() {
  // This will always render static content without any API calls
  return (
    <div style={{padding: '20px', maxWidth: '1200px', margin: '0 auto'}}>
      <SEO 
        title="AI News - Latest AWS, GCP & Artificial Intelligence Updates"
        description="Stay up-to-date with the latest AWS, Google Cloud Platform, and AI news. Expert analysis on cloud services, machine learning, neural networks, and more."
        keywords="AWS news, GCP news, Google Cloud Platform, Amazon Web Services, cloud computing, AI news, artificial intelligence, machine learning, neural networks, computer vision, NLP, AI breakthroughs, AI research"
        canonical="/news"
      />
      <h1 style={{fontSize: '24px', textAlign: 'center', marginBottom: '20px'}}>
        AI News
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            AI Healthcare Breakthroughs
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Healthcare
          </p>
          <p style={{marginBottom: '16px'}}>
            New AI models are helping doctors diagnose diseases with greater accuracy.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            Machine Learning in 2025
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Technology
          </p>
          <p style={{marginBottom: '16px'}}>
            Expert predictions for machine learning advancements coming this year.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            Neural Networks Explained
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Education
          </p>
          <p style={{marginBottom: '16px'}}>
            A beginner's guide to understanding neural networks.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            AI Ethics Guidelines
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Ethics
          </p>
          <p style={{marginBottom: '16px'}}>
            New industry standards for ethical AI development and deployment.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            NLP Breakthroughs
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Research
          </p>
          <p style={{marginBottom: '16px'}}>
            Recent advancements in natural language processing technology.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
        
        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
            Computer Vision Applications
          </h2>
          <p style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>
            March 1, 2025 • Innovation
          </p>
          <p style={{marginBottom: '16px'}}>
            How computer vision is transforming industries from retail to healthcare.
          </p>
          <a href="#" style={{color: 'blue', textDecoration: 'none'}}>Read more →</a>
        </div>
      </div>
    </div>
  );
}

export default EmergencyNewsComponent;