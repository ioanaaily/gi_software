import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getOrganizationSchema, getWebsiteSchema, getArticleSchema, formatSchema } from '../utils/structuredData';

const SEO = ({ 
  title, 
  description, 
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/logo512.png',
  twitterCard = 'summary_large_image',
  article = null,
  structuredData = null
}) => {
  // Default values
  const defaultTitle = 'GI Software SRL - Leading AWS & Google Cloud Solutions';
  const defaultDescription = 'Expert AWS and Google Cloud Platform services, software development and IT consulting for businesses of all sizes.';
  const defaultKeywords = 'AWS, Amazon Web Services, Google Cloud Platform, GCP, cloud services, software development, business solutions, IT consulting, tech innovation, GI Software';
  const siteUrl = 'https://gisoftware.com';
  
  // Use provided values or defaults
  const pageTitle = title ? `${title} | GI Software` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  
  // Prepare structured data
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const articleSchema = article ? getArticleSchema(article) : null;
  
  // Determine which schemas to include
  let schemas = [orgSchema, websiteSchema];
  if (articleSchema) schemas.push(articleSchema);
  if (structuredData) schemas.push(structuredData);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={pageCanonical} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Additional SEO Best Practices */}
      <meta name="robots" content="index, follow" />
      <html lang="en" />
      
      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {formatSchema(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;