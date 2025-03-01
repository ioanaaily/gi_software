/**
 * Sitemap generator utility
 * 
 * This script can be run as part of your build process to generate a dynamic sitemap.xml
 * that includes all your articles. It can be used with a serverless function or build hook.
 * 
 * Usage:
 * 1. Modify the baseUrl to match your production URL
 * 2. Add this script to your build process
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const baseUrl = 'https://gisoftware.com';
const outputPath = path.join(__dirname, '../../public/sitemap.xml');
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Generates a sitemap.xml file
 */
async function generateSitemap() {
  try {
    console.log('Generating sitemap.xml...');
    
    // Fetch all articles from API
    const articlesResponse = await axios.get(`${apiUrl}/api/news/articles`);
    const articles = articlesResponse.data || [];
    
    // Static routes
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/news', priority: '0.9', changefreq: 'daily' },
      // Add more static routes as needed
    ];
    
    // Generate sitemap XML content
    let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static routes
    staticRoutes.forEach(route => {
      sitemapContent += '  <url>\n';
      sitemapContent += `    <loc>${baseUrl}${route.url}</loc>\n`;
      sitemapContent += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemapContent += `    <changefreq>${route.changefreq}</changefreq>\n`;
      sitemapContent += `    <priority>${route.priority}</priority>\n`;
      sitemapContent += '  </url>\n';
    });
    
    // Add article routes
    articles.forEach(article => {
      const slug = article.slug;
      const lastmod = article.modified_date || article.published_date || new Date().toISOString().split('T')[0];
      
      sitemapContent += '  <url>\n';
      sitemapContent += `    <loc>${baseUrl}/news/${slug}</loc>\n`;
      sitemapContent += `    <lastmod>${lastmod.split('T')[0]}</lastmod>\n`;
      sitemapContent += '    <changefreq>monthly</changefreq>\n';
      sitemapContent += '    <priority>0.8</priority>\n';
      sitemapContent += '  </url>\n';
    });
    
    sitemapContent += '</urlset>';
    
    // Write the sitemap file
    fs.writeFileSync(outputPath, sitemapContent);
    console.log(`Sitemap generated at ${outputPath}`);
    
    return { success: true, message: 'Sitemap generated successfully' };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return { success: false, message: error.message };
  }
}

// When run directly
if (require.main === module) {
  generateSitemap()
    .then(result => {
      if (result.success) {
        console.log(result.message);
        process.exit(0);
      } else {
        console.error(result.message);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Unexpected error:', err);
      process.exit(1);
    });
}

module.exports = generateSitemap;