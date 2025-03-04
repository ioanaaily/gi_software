from fastapi import APIRouter, Depends, Header, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Optional, List
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import ContactMessage, User
from api.auth import validate_token

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str
    
class ContactMessageResponse(BaseModel):
    id: int
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
        
@router.get("/messages", response_model=List[ContactMessageResponse])
async def get_contact_messages(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(validate_token)
):
    """
    Fetch all contact messages. This endpoint is protected and requires admin privileges.
    """
    # Check if user is admin
    if not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to access this resource"
        )
    
    # Retrieve all contact messages
    query = select(ContactMessage).order_by(ContactMessage.id.desc())
    result = await db.execute(query)
    messages = result.scalars().all()
    
    return messages
