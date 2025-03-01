/**
 * Generate JSON-LD structured data for different page types
 * These help search engines understand the content better
 */

// Organization structured data
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GI Software SRL',
    url: 'https://gisoftware.com',
    logo: 'https://gisoftware.com/logo.png',
    description: 'Expert AWS and Google Cloud Platform services, software development and IT consulting for businesses of all sizes.',
    sameAs: [
      'https://www.facebook.com/gisoftware',
      'https://www.linkedin.com/company/gisoftware',
      'https://twitter.com/gisoftware'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-123-456-789',
      contactType: 'customer service',
      email: 'contact@gisoftware.com'
    },
    // Add service offerings
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AWS Cloud Services',
          description: 'Amazon Web Services infrastructure setup, management, and optimization'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Google Cloud Platform Services',
          description: 'AWS or Google Cloud Platform implementation, management, and optimization'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Software Development',
          description: 'Tailored software solutions for businesses'
        }
      }
    ]
  };
};

// Website structured data
export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GI Software SRL - AWS & Google Cloud Experts',
    description: 'Expert AWS and Google Cloud Platform services, software development and IT consulting for businesses of all sizes.',
    url: 'https://gisoftware.com',
    keywords: 'AWS, Amazon Web Services, Google Cloud Platform, GCP, cloud services, software development',
    potentialAction: {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://gisoftware.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Article structured data
export const getArticleSchema = (article) => {
  if (!article) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.image_url ? [article.image_url] : [],
    datePublished: article.published_date,
    dateModified: article.modified_date || article.published_date,
    author: {
      '@type': 'Person',
      name: article.author || 'GI Software'
    },
    publisher: {
      '@type': 'Organization',
      name: 'GI Software SRL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gisoftware.com/logo.png'
      }
    },
    description: article.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gisoftware.com/news/${article.slug}`
    }
  };
};

// BreadcrumbList structured data
export const getBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// Format structured data as a string
export const formatSchema = (schema) => {
  if (!schema) return '';
  return JSON.stringify(schema);
};