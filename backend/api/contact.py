from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
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
async def submit_contact(form: ContactForm, db: AsyncSession = Depends(get_db)):
    """Handles contact form submissions and stores data in the database."""
    new_message = ContactMessage(name=form.name, email=form.email, message=form.message)
    db.add(new_message)
    await db.commit()
    return {"success": True, "message": "Message stored successfully"}
