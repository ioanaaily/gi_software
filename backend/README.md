# GI Software - Language Translation Implementation

This documentation explains how to use the Romanian translation functionality implemented in the GI Software backend and frontend.

## Backend API Translation

The backend now supports translating content between English and Romanian. All API endpoints accept language preference via:

1. `language` query parameter (e.g. `?language=ro`)
2. `Accept-Language` header

### Key Files

- `translation.py` - Core translation service
- API endpoints in `api/news.py` and `api/contact.py` - Updated to support translation

### How It Works

1. The translation system checks if a language preference is specified
2. If Romanian is requested, content is translated before being returned
3. Static UI elements have pre-defined translations
4. Dynamic content is translated using basic word mapping

## Frontend Implementation

Files created for the frontend (copy these to the frontend project):

### 1. Language Switcher Component

- `language_switcher.js` → Copy to `frontend/src/components/LanguageSwitcher.js`
- `language-switcher.css` → Copy to `frontend/src/components/language-switcher.css`

### 2. Translation Context Provider

- `TranslationProvider.js` → Copy to `frontend/src/context/TranslationProvider.js`
- `translations.js` → Copy to `frontend/src/utils/translations.js`

### Integration Steps

1. Import the TranslationProvider in your main App.js:

```jsx
import { TranslationProvider } from './context/TranslationProvider';

function App() {
  return (
    <TranslationProvider>
      {/* Your app components */}
    </TranslationProvider>
  );
}
```

2. Add the LanguageSwitcher to your Navbar component:

```jsx
import LanguageSwitcher from './components/LanguageSwitcher';

function Navbar() {
  return (
    <nav>
      {/* Existing nav items */}
      <LanguageSwitcher />
    </nav>
  );
}
```

3. Use translations in your components:

```jsx
import { useTranslation } from '../context/TranslationProvider';

function SomeComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('welcomeMessage')}</h2>
      <p>{t('description')}</p>
      <button>{t('submit')}</button>
    </div>
  );
}
```

4. For API requests, include the language parameter:

```jsx
// In your API service
const fetchArticles = async () => {
  const language = localStorage.getItem('language') || 'en';
  const response = await fetch(`/api/news?language=${language}`);
  return response.json();
};
```

## Testing

- Test API endpoints with different language parameters:
  - `curl http://localhost:8000/api/test?language=ro`
  - `curl -H "Accept-Language: ro" http://localhost:8000/api/test`

- Test the frontend by toggling the language switcher