import jwt
import os
import sys
import bcrypt
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import User

router = APIRouter()

# Use a more secure SECRET_KEY and move to environment variable or config in production
SECRET_KEY = "H4568459333sEdCvFrTgBnHyUjMiKoL123!@#"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode('utf-8')

async def verify_user(email: str, password: str, db: AsyncSession):
    """Verify user credentials from the database."""
    query = select(User).where(User.email == email)
    result = await db.execute(query)
    user = result.scalars().first()
    
    if not user:
        return None
    
    # Only use bcrypt for password verification
    try:
        password_bytes = password.encode('utf-8')
        stored_hash_bytes = user.password.encode('utf-8')
        if bcrypt.checkpw(password_bytes, stored_hash_bytes):
            print(f"User authenticated with bcrypt")
            return user
    except Exception as e:
        print(f"Bcrypt verification failed: {e}")
    
    # Special case for admin migration - only runs once to convert admin to bcrypt
    if email == "admin@gisoftware.com" and password == "admin" and user.password == "admin":
        print(f"Migrating admin user to bcrypt hashing")
        # Upgrade the password to bcrypt
        try:
            user.password = hash_password("admin")
            await db.commit()
            print(f"Admin password upgraded to bcrypt")
            return user
        except Exception as e:
            print(f"Error upgrading admin password: {e}")
    
    return None

def create_access_token(data: dict, expires_delta: timedelta):
    """Generate JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def validate_token(authorization: Optional[str] = Header(None), db: AsyncSession = Depends(get_db)):
    """Validate JWT token and return user."""
    if not authorization:
        raise HTTPException(
            status_code=401, 
            detail="Authorization header missing"
        )
    
    try:
        # Extract token from "Bearer {token}"
        if authorization.startswith("Bearer "):
            token = authorization.split(" ")[1]
        else:
            token = authorization
            
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        
        if email is None:
            raise HTTPException(
                status_code=401, 
                detail="Invalid authentication credentials"
            )
            
        # Get user from database
        query = select(User).where(User.email == email)
        result = await db.execute(query)
        user = result.scalars().first()
        
        if user is None:
            raise HTTPException(
                status_code=401, 
                detail="User not found"
            )
            
        return user
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401, 
            detail="Invalid authentication credentials"
        )

from fastapi import Form, Body
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_json(
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    """Handle user login with JSON and return access token."""
    try:
        if not login_data.email or not login_data.password:
            raise HTTPException(status_code=400, detail="Email and password are required")
            
        print(f"Login attempt for: {login_data.email}")
        
        user = await verify_user(login_data.email, login_data.password, db)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )

        return {
            "access_token": access_token, 
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "is_admin": user.is_admin
        }
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Login error: {str(e)}"
        )

@router.post("/login-form")
async def login_form(
    email: str = Form(...),
    password: str = Form(...),
    db: AsyncSession = Depends(get_db)
):
    """Handle user login with form data and return access token."""
    try:
        if not email or not password:
            raise HTTPException(status_code=400, detail="Email and password are required")
            
        print(f"Form login attempt for: {email}")
        
        user = await verify_user(email, password, db)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )

        return {
            "access_token": access_token, 
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "is_admin": user.is_admin
        }
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Login error: {str(e)}"
        )

@router.post("/logout")
async def logout():
    """Handle user logout (if needed)."""
    return {"message": "Logged out successfully"}

@router.get("/me")
async def get_current_user(user: User = Depends(validate_token)):
    """Get current user information."""
    return {
        "user_id": user.id,
        "email": user.email,
        "is_admin": user.is_admin
    }
