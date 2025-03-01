from fastapi import APIRouter, Depends, Header, Query
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import ContactMessage

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@router.post("/")
async def submit_contact(
    form: ContactForm, 
    language: Optional[str] = Query(None),
    accept_language: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
):
    """
    Handles contact form submissions and stores data in the database.
    Returns a success message in the requested language.
    """
    # Import translation
    from translation import get_preferred_language
    
    # Get language preference
    preferred_lang = get_preferred_language(accept_language, language)
    
    # Create and store the message
    new_message = ContactMessage(name=form.name, email=form.email, message=form.message)
    db.add(new_message)
    await db.commit()
    
    # Return appropriate message based on language
    if preferred_lang == "ro":
        return {"success": True, "message": "Mesajul a fost trimis cu succes"}
    else:
        return {"success": True, "message": "Message stored successfully"}
