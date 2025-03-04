from fastapi import APIRouter, Depends, Query, Response
from typing import Dict, Any, Optional
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from translation import get_preferred_language, translate_text, translate_dict, TRANSLATIONS

router = APIRouter()

@router.get("/language")
def get_language(language: str = Depends(get_preferred_language)):
    """Get the current language based on request headers or query parameters"""
    return {"language": language}

@router.get("/ui-elements")
def get_ui_translations(language: str = Depends(get_preferred_language)):
    """Get all UI element translations for a specific language"""
    if language not in TRANSLATIONS:
        language = "en"  # Fallback to English
    
    return {"translations": TRANSLATIONS[language]}

@router.post("/translate-text")
async def translate_text_endpoint(
    text: str,
    target_language: Optional[str] = Query("ro")
):
    """Translate a single text string to the target language"""
    translated = translate_text(text, target_language)
    return {"original": text, "translated": translated, "language": target_language}

@router.post("/translate-json")
async def translate_json(
    data: Dict[str, Any],
    target_language: Optional[str] = Query("ro")
):
    """Translate all string values in a JSON object to the target language"""
    translated = translate_dict(data, target_language)
    return {"translated": translated, "language": target_language}