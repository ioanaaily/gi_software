# Romanian Translation Implementation Guide

This guide outlines how to implement Romanian translation for your website. The approach uses a combination of frontend and backend techniques to provide a seamless multilingual experience.

## Overview

1. **Frontend Language Switcher**: Add a language toggle in the navbar
2. **Translation Service**: Use a translation library or API
3. **Backend API Enhancements**: Modify endpoints to handle language preference
4. **Database Approach**: Store translations or use real-time translation

## Implementation Steps

### 1. Backend Setup

#### 1.1. Add Translation Library

```bash
# Install translation libraries
pip install googletrans==4.0.0-rc1 python-i18n
```

#### 1.2. Create a Translation Service Module

Create a new file `translation.py`:

```python
from googletrans import Translator
from fastapi import Depends, Header, Query
from typing import Optional
import json
import os
from pathlib import Path

# Initialize the translator
translator = Translator()

# Cache for translations to avoid repeated API calls
translation_cache = {}

# Static translations for common UI elements
STATIC_TRANSLATIONS = {
    "en": {
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "news": "News",
        "services": "Services",
        "login": "Login",
        "read_more": "Read More",
        # Add more static translations here
    },
    "ro": {
        "home": "Acasă",
        "about": "Despre",
        "contact": "Contact",
        "news": "Știri",
        "services": "Servicii",
        "login": "Autentificare",
        "read_more": "Citește mai mult",
        # Add more static translations here
    }
}

def get_preferred_language(accept_language: Optional[str] = Header(None)) -> str:
    """Extract the preferred language from the Accept-Language header or query param."""
    if accept_language:
        # Parse the Accept-Language header and get the first language
        langs = accept_language.split(',')
        if langs and langs[0]:
            lang_code = langs[0].split(';')[0].strip().lower()
            if lang_code == "ro" or lang_code.startswith("ro-"):
                return "ro"
    return "en"  # Default to English

def translate_text(text: str, target_language: str = "ro", source_language: str = "en") -> str:
    """Translate text to the target language."""
    if not text or target_language == source_language:
        return text
    
    # Check cache first
    cache_key = f"{text}:{target_language}"
    if cache_key in translation_cache:
        return translation_cache[cache_key]
    
    # Check if we have a static translation
    if text in STATIC_TRANSLATIONS.get(source_language, {}):
        src_key = text
        if src_key in STATIC_TRANSLATIONS.get(target_language, {}):
            return STATIC_TRANSLATIONS[target_language][src_key]
    
    try:
        # Use the translation API for dynamic content
        result = translator.translate(text, src=source_language, dest=target_language)
        translated = result.text
        
        # Cache the result
        translation_cache[cache_key] = translated
        return translated
    except Exception as e:
        print(f"Translation error: {e}")
        return text  # Return original if translation fails

def translate_dict(data: dict, target_language: str = "ro") -> dict:
    """Recursively translate values in a dictionary."""
    if target_language == "en":
        return data  # No translation needed for English (source)
    
    result = {}
    for key, value in data.items():
        if isinstance(value, dict):
            result[key] = translate_dict(value, target_language)
        elif isinstance(value, list):
            result[key] = [
                translate_dict(item, target_language) if isinstance(item, dict) 
                else translate_text(item, target_language) if isinstance(item, str)
                else item
                for item in value
            ]
        elif isinstance(value, str):
            # Only translate string content, not IDs or short codes
            if len(value) > 3 and not key.endswith('_id') and not key == 'id' and not key == 'slug':
                result[key] = translate_text(value, target_language)
            else:
                result[key] = value
        else:
            result[key] = value
    
    return result
```

#### 1.3. Update API Endpoints

Modify your API endpoints to use the translation service:

```python
# In your API endpoints (e.g., news.py)
from translation import get_preferred_language, translate_dict

@router.get("/articles")
async def get_articles(language: str = Query("en"), lang_header: str = Depends(get_preferred_language)):
    # Use language query param if provided, otherwise use header
    target_lang = language if language != "en" else lang_header
    
    # Get articles from DB (in English)
    # ...existing code to fetch articles...
    
    # Translate if needed
    if target_lang != "en":
        articles = [translate_dict(article, target_lang) for article in articles]
    
    return articles
```

### 2. Frontend Implementation

#### 2.1. Add Language Switcher

Create a language switcher component in your navbar:

```jsx
// LanguageSwitcher.js
import React, { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    document.documentElement.lang = savedLang;
  }, []);
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ro' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    window.location.reload(); // Reload to apply new language
  };
  
  return (
    <button 
      onClick={toggleLanguage} 
      className="lang-switcher"
    >
      {language === 'en' ? 'RO' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
```

#### 2.2. Update API Requests

Add the language preference to all API requests:

```jsx
// In your API service file
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with language headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add language to requests
apiClient.interceptors.request.use(config => {
  const language = localStorage.getItem('language') || 'en';
  
  // Add language as query parameter
  const url = new URL(config.url, window.location.origin);
  url.searchParams.append('language', language);
  config.url = url.pathname + url.search;
  
  // Also set the Accept-Language header
  config.headers['Accept-Language'] = language;
  
  return config;
});

export default apiClient;
```

#### 2.3. Add Static Translations for UI Elements

Create a translations file for static UI elements:

```jsx
// translations.js
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    news: 'News',
    services: 'Services',
    login: 'Login',
    // Add more translations here
  },
  ro: {
    home: 'Acasă',
    about: 'Despre',
    contact: 'Contact',
    news: 'Știri',
    services: 'Servicii',
    login: 'Autentificare',
    // Add more translations here
  }
};

export default translations;
```

Create a translation hook:

```jsx
// useTranslation.js
import { useEffect, useState } from 'react';
import translations from './translations';

export function useTranslation() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
  }, []);
  
  const t = (key) => {
    if (!translations[language]) return key;
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t, language };
}
```

#### 2.4. Use Translations in Components

Update your components to use translations:

```jsx
// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from './useTranslation';

const Navbar = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="navbar">
      <div className="logo">GI SOFTWARE</div>
      <div className="nav-links">
        <Link to="/">{t('home')}</Link>
        <Link to="/about">{t('about')}</Link>
        <Link to="/services">{t('services')}</Link>
        <Link to="/news">{t('news')}</Link>
        <Link to="/contact">{t('contact')}</Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
```

## Testing and Deployment

1. Start the backend with translation support:
   ```
   uvicorn main:app --reload
   ```

2. Run the frontend:
   ```
   cd ../frontend && npm start
   ```

3. Test the language toggle and check if content is translated

## Advanced Features

### Server-Side Pre-Translation

For performance-critical content, you can pre-translate and store translations:

```python
# In your database models (models.py)
class NewsArticleTranslation(Base):
    __tablename__ = "news_article_translation"
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("news_article.id"))
    language = Column(String, index=True)
    title = Column(String)
    excerpt = Column(String)
    content = Column(Text)
    
    # Relationship
    article = relationship("NewsArticle", back_populates="translations")

# Update the NewsArticle model
class NewsArticle(Base):
    # ... existing fields ...
    translations = relationship("NewsArticleTranslation", back_populates="article")
```

### Translation Management UI

Consider adding an admin interface to manage and edit translations manually, giving you more control over the quality of translations.