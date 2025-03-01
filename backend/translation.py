"""
Translation module for GI Software.
Provides functionality for translating content between English and Romanian.
"""
from fastapi import Depends, Header, Query
from typing import Optional, Dict, Any, List, Union
import json
import os
from pathlib import Path

# Dictionary of static translations for common UI elements
TRANSLATIONS = {
    "en": {
        # Navbar items
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "news": "News",
        "services": "Services",
        "login": "Login",
        
        # Common buttons and labels
        "read_more": "Read More",
        "submit": "Submit",
        "send": "Send",
        "search": "Search",
        "back": "Back",
        "next": "Next",
        "previous": "Previous",
        
        # Footer items
        "all_rights_reserved": "All rights reserved",
        "privacy_policy": "Privacy Policy",
        "terms_of_service": "Terms of Service",

        # Contact form
        "name": "Name",
        "email": "Email",
        "message": "Message",
        "phone": "Phone",
        "subject": "Subject",
        "your_name": "Your Name",
        "your_email": "Your Email",
        "your_message": "Your Message",
        "contact_us": "Contact Us",
        "get_in_touch": "Get in Touch",
        
        # About page
        "about_us": "About Us",
        "our_mission": "Our Mission",
        "our_vision": "Our Vision",
        "our_team": "Our Team",
        "our_history": "Our History",
        
        # Services page
        "our_services": "Our Services",
        "service_description": "Service Description",
        
        # Admin section
        "admin_panel": "Admin Panel",
        "dashboard": "Dashboard",
        "manage_articles": "Manage Articles",
        "edit": "Edit",
        "delete": "Delete",
        "logout": "Logout",
        "welcome": "Welcome",
        
        # Notifications
        "success": "Success",
        "error": "Error",
        "message_sent": "Message Sent",
        "thank_you": "Thank You",
    },
    "ro": {
        # Navbar items
        "home": "Acasă",
        "about": "Despre",
        "contact": "Contact",
        "news": "Știri",
        "services": "Servicii",
        "login": "Autentificare",
        
        # Common buttons and labels
        "read_more": "Citește mai mult",
        "submit": "Trimite",
        "send": "Trimite",
        "search": "Caută",
        "back": "Înapoi",
        "next": "Următorul",
        "previous": "Anterior",
        
        # Footer items
        "all_rights_reserved": "Toate drepturile rezervate",
        "privacy_policy": "Politica de confidențialitate",
        "terms_of_service": "Termeni și condiții",
        
        # Contact form
        "name": "Nume",
        "email": "Email",
        "message": "Mesaj",
        "phone": "Telefon",
        "subject": "Subiect",
        "your_name": "Numele dumneavoastră",
        "your_email": "Emailul dumneavoastră",
        "your_message": "Mesajul dumneavoastră",
        "contact_us": "Contactați-ne",
        "get_in_touch": "Luați legătura cu noi",
        
        # About page
        "about_us": "Despre noi",
        "our_mission": "Misiunea noastră",
        "our_vision": "Viziunea noastră",
        "our_team": "Echipa noastră",
        "our_history": "Istoria noastră",
        
        # Services page
        "our_services": "Serviciile noastre",
        "service_description": "Descrierea serviciului",
        
        # Admin section
        "admin_panel": "Panou de administrare",
        "dashboard": "Tablou de bord",
        "manage_articles": "Gestionare articole",
        "edit": "Editează",
        "delete": "Șterge",
        "logout": "Deconectare",
        "welcome": "Bun venit",
        
        # Notifications
        "success": "Succes",
        "error": "Eroare",
        "message_sent": "Mesaj trimis",
        "thank_you": "Mulțumim",
    }
}

# Translation cache for dynamic content
dynamic_translation_cache = {}

def get_preferred_language(accept_language: Optional[str] = Header(None), 
                          language: Optional[str] = Query(None)) -> str:
    """
    Extract the preferred language from the Accept-Language header or query param.
    
    Args:
        accept_language: The Accept-Language header value
        language: Language query parameter
        
    Returns:
        The language code (en or ro)
    """
    # Query parameter takes precedence
    if language and language.lower() in ["en", "ro"]:
        return language.lower()
        
    # Then check Accept-Language header
    if accept_language:
        # Parse the Accept-Language header and get the first language
        langs = accept_language.split(',')
        if langs and langs[0]:
            lang_code = langs[0].split(';')[0].strip().lower()
            if lang_code == "ro" or lang_code.startswith("ro-"):
                return "ro"
    
    # Default to English
    return "en"

def translate_text(text: str, target_language: str = "ro") -> str:
    """
    Translate a text string to the target language.
    
    Args:
        text: The text to translate
        target_language: The target language code (en or ro)
        
    Returns:
        Translated text
    """
    if not text or target_language == "en":
        return text
    
    # Check if it's a common UI element with a static translation
    if text in TRANSLATIONS["en"]:
        return TRANSLATIONS[target_language].get(text, text)
    
    # Check cache for previously translated content
    cache_key = f"{text}:{target_language}"
    if cache_key in dynamic_translation_cache:
        return dynamic_translation_cache[cache_key]
    
    # For a production app, you would integrate with a translation API here
    # For now, we'll implement a simple Romanian translation for common words
    # This is just a placeholder to simulate translation
    
    # Some basic Romanian replacements for common English words
    basic_translations = {
        "software": "software",
        "technology": "tehnologie",
        "development": "dezvoltare",
        "company": "companie",
        "business": "afacere",
        "solution": "soluție",
        "digital": "digital",
        "innovation": "inovație",
        "customer": "client",
        "product": "produs",
        "service": "serviciu",
        "team": "echipă",
        "project": "proiect",
        "quality": "calitate",
        "experience": "experiență",
        "professional": "profesional",
        "industry": "industrie",
        "market": "piață",
        "success": "succes",
        "client": "client",
        "partner": "partener",
        "global": "global",
        "local": "local",
        "future": "viitor",
        "technology": "tehnologie",
        "application": "aplicație",
        "system": "sistem",
        "security": "securitate",
        "data": "date",
        "user": "utilizator",
        "interface": "interfață",
        "web": "web",
        "mobile": "mobil",
        "cloud": "cloud",
        "enterprise": "întreprindere",
        "management": "management",
        "support": "suport",
    }
    
    # Simple word replacement
    translated = text
    for eng_word, ro_word in basic_translations.items():
        translated = translated.replace(f" {eng_word} ", f" {ro_word} ")
        
        # Handle word at beginning of text
        if translated.startswith(f"{eng_word} "):
            translated = translated.replace(f"{eng_word} ", f"{ro_word} ", 1)
            
        # Handle word at end of text
        if translated.endswith(f" {eng_word}"):
            translated = translated.replace(f" {eng_word}", f" {ro_word}", 1)
            
        # Handle word as the entire text
        if translated == eng_word:
            translated = ro_word
    
    # Cache the result for future use
    dynamic_translation_cache[cache_key] = translated
    return translated

def translate_dict(data: Dict[str, Any], target_language: str = "ro") -> Dict[str, Any]:
    """
    Recursively translate all string values in a dictionary.
    
    Args:
        data: The dictionary to translate
        target_language: The target language code (en or ro)
        
    Returns:
        Dictionary with translated values
    """
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
            # Only translate content, not IDs, slugs, or codes
            if len(value) > 3 and not key.endswith('_id') and key not in ['id', 'slug', 'email', 'image_url']:
                result[key] = translate_text(value, target_language)
            else:
                result[key] = value
        else:
            result[key] = value
    
    return result