from fastapi import APIRouter, Depends, HTTPException, status, Query, Header
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Optional
from pydantic import BaseModel
import datetime
import re
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import NewsArticle, User
from api.auth import validate_token

router = APIRouter()

class NewsArticleCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image_url: Optional[str] = None
    category: Optional[str] = None
    published: bool = True
    published_date: Optional[datetime.datetime] = None

class NewsArticleUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    published: Optional[bool] = None
    published_date: Optional[datetime.datetime] = None

class NewsArticleResponse(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: str
    content: str
    image_url: Optional[str]
    category: Optional[str]
    published: bool
    published_date: datetime.datetime
    created_at: datetime.datetime
    updated_at: datetime.datetime
    author_id: int
    
    class Config:
        orm_mode = True

def create_slug(title: str) -> str:
    """Create a URL-friendly slug from the title."""
    # Convert to lowercase and replace spaces with hyphens
    slug = title.lower().strip()
    # Remove special characters
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Remove multiple hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug

@router.post("/", response_model=NewsArticleResponse, status_code=status.HTTP_201_CREATED)
def create_news_article(
    article: NewsArticleCreate,
    user: User = Depends(validate_token),
    db: Session = Depends(get_db)
):
    """Create a new news article (admin only)."""
    try:
        print(f"Create article request from {user.email}, data: {article}")
        
        if not user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to create news articles"
            )
        
        # Create slug from title
        slug = create_slug(article.title)
        
        # Check for duplicate slug
        existing_article = db.query(NewsArticle).filter(NewsArticle.slug == slug).first()
        if existing_article:
            # Append a unique identifier to make slug unique
            slug = f"{slug}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Set published date if not provided
        if article.published_date:
            # Ensure it's a proper datetime if it comes as a string
            if isinstance(article.published_date, str):
                try:
                    published_date = datetime.datetime.fromisoformat(article.published_date.replace('Z', '+00:00'))
                except ValueError:
                    try:
                        published_date = datetime.datetime.strptime(article.published_date, '%Y-%m-%d')
                    except ValueError:
                        published_date = datetime.datetime.utcnow()
            else:
                published_date = article.published_date
        else:
            published_date = datetime.datetime.utcnow()
        
        # Set current time for created_at and updated_at
        now = datetime.datetime.utcnow()
        
        # Create new article
        db_article = NewsArticle(
            title=article.title,
            slug=slug,
            excerpt=article.excerpt,
            content=article.content,
            image_url=article.image_url,
            category=article.category,
            published=article.published,
            published_date=published_date,
            created_at=now,
            updated_at=now,
            author_id=user.id
        )
        
        db.add(db_article)
        db.commit()
        db.refresh(db_article)
        
        print(f"Article created: {db_article.id} - {db_article.title}")
        return db_article
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        print(f"Error creating article: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating article: {str(e)}"
        )

class PaginatedNewsResponse(BaseModel):
    items: List[NewsArticleResponse]
    total: int
    page: int
    size: int
    pages: int

@router.get("/", response_model=PaginatedNewsResponse)
def get_news_articles(
    page: int = 1,
    size: int = 6,
    category: Optional[str] = None,
    language: Optional[str] = Query(None),
    accept_language: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Get a paginated list of news articles, optionally filtered by category.
    
    - page: Page number (starting from 1)
    - size: Number of items per page (max 6)
    - category: Optional category filter
    - language: Optional language code (en/ro)
    """
    # Import translation functions
    from translation import get_preferred_language, translate_dict
    
    # Enforce max page size of 6
    if size > 6:
        size = 6
    
    # Calculate skip from page and size
    skip = (page - 1) * size
    
    # Create base query for count
    query = db.query(NewsArticle).filter(NewsArticle.published == True)
    
    if category:
        query = query.filter(NewsArticle.category == category)
    
    # Get total count
    total = query.count()
    
    # Get paginated results
    articles = query.order_by(desc(NewsArticle.published_date)).offset(skip).limit(size).all()
    
    # Calculate total pages
    pages = (total + size - 1) // size  # Ceiling division
    
    # Get language preference
    preferred_lang = get_preferred_language(accept_language, language)
    
    # Prepare response
    response = {
        "items": articles,
        "total": total,
        "page": page,
        "size": size,
        "pages": pages
    }
    
    # Translate if Romanian is requested
    if preferred_lang == "ro":
        translated_items = []
        for article in response["items"]:
            article_dict = {
                "id": article.id,
                "title": article.title,
                "slug": article.slug,
                "excerpt": article.excerpt,
                "content": article.content,
                "image_url": article.image_url,
                "category": article.category,
                "published": article.published,
                "published_date": article.published_date,
                "created_at": article.created_at,
                "updated_at": article.updated_at,
                "author_id": article.author_id
            }
            translated_items.append(translate_dict(article_dict, "ro"))
        response["items"] = translated_items
        
    return response

@router.get("/{article_id}", response_model=NewsArticleResponse)
def get_news_article(
    article_id: int,
    language: Optional[str] = Query(None),
    accept_language: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Get a specific news article by ID.
    
    - article_id: ID of the article to retrieve
    - language: Optional language code (en/ro)
    """
    # Import translation functions
    from translation import get_preferred_language, translate_dict
    
    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
    
    if article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Get language preference
    preferred_lang = get_preferred_language(accept_language, language)
    
    # Return article as is for English
    if preferred_lang == "en":
        return article
    
    # For Romanian, translate the article
    article_dict = {
        "id": article.id,
        "title": article.title,
        "slug": article.slug,
        "excerpt": article.excerpt,
        "content": article.content,
        "image_url": article.image_url,
        "category": article.category,
        "published": article.published,
        "published_date": article.published_date,
        "created_at": article.created_at,
        "updated_at": article.updated_at,
        "author_id": article.author_id
    }
    
    translated = translate_dict(article_dict, "ro")
    
    # Create a new article object with translated values
    for key, value in translated.items():
        if hasattr(article, key):
            setattr(article, key, value)
    
    return article

@router.get("/slug/{slug}", response_model=NewsArticleResponse)
def get_news_article_by_slug(
    slug: str,
    language: Optional[str] = Query(None),
    accept_language: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Get a specific news article by slug.
    
    - slug: URL-friendly slug of the article
    - language: Optional language code (en/ro)
    """
    # Import translation functions
    from translation import get_preferred_language, translate_dict
    
    article = db.query(NewsArticle).filter(NewsArticle.slug == slug).first()
    
    if article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Get language preference
    preferred_lang = get_preferred_language(accept_language, language)
    
    # Return article as is for English
    if preferred_lang == "en":
        return article
    
    # For Romanian, translate the article
    article_dict = {
        "id": article.id,
        "title": article.title,
        "slug": article.slug,
        "excerpt": article.excerpt,
        "content": article.content,
        "image_url": article.image_url,
        "category": article.category,
        "published": article.published,
        "published_date": article.published_date,
        "created_at": article.created_at,
        "updated_at": article.updated_at,
        "author_id": article.author_id
    }
    
    translated = translate_dict(article_dict, "ro")
    
    # Create a new article object with translated values
    for key, value in translated.items():
        if hasattr(article, key):
            setattr(article, key, value)
    
    return article

@router.put("/{article_id}", response_model=NewsArticleResponse)
def update_news_article(
    article_id: int,
    article_update: NewsArticleUpdate,
    user: User = Depends(validate_token),
    db: Session = Depends(get_db)
):
    """Update an existing news article (admin only)."""
    try:
        if not user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update news articles"
            )
        
        # Get the existing article
        db_article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
        
        if db_article is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Article not found"
            )
        
        # Update article fields if provided
        if article_update.title is not None:
            db_article.title = article_update.title
            # Update slug if title changes
            db_article.slug = create_slug(article_update.title)
            
            # Check for duplicate slug
            existing_article = db.query(NewsArticle).filter(
                NewsArticle.slug == db_article.slug,
                NewsArticle.id != article_id
            ).first()
            if existing_article:
                # Append a unique identifier to make slug unique
                db_article.slug = f"{db_article.slug}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        if article_update.excerpt is not None:
            db_article.excerpt = article_update.excerpt
        
        if article_update.content is not None:
            db_article.content = article_update.content
        
        if article_update.image_url is not None:
            db_article.image_url = article_update.image_url
        
        if article_update.category is not None:
            db_article.category = article_update.category
        
        if article_update.published is not None:
            db_article.published = article_update.published
        
        if article_update.published_date is not None:
            db_article.published_date = article_update.published_date
        
        # Update timestamp
        db_article.updated_at = datetime.datetime.utcnow()
        
        db.commit()
        db.refresh(db_article)
        return db_article
    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating article: {str(e)}"
        )

@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news_article(
    article_id: int,
    user: User = Depends(validate_token),
    db: Session = Depends(get_db)
):
    """Delete a news article (admin only)."""
    try:
        if not user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete news articles"
            )
        
        # Get the existing article
        db_article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
        
        if db_article is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Article not found"
            )
        
        db.delete(db_article)
        db.commit()
        return None
    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting article: {str(e)}"
        )