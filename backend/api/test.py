from fastapi import APIRouter, Depends, HTTPException, status, Header, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
import datetime
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import NewsArticle, User

router = APIRouter()

@router.get("/")
def test(language: Optional[str] = Query(None), accept_language: Optional[str] = Header(None)):
    """
    Simple test endpoint to verify API is working with translation support.
    
    Returns a message in the requested language.
    """
    # Import translation
    from translation import get_preferred_language
    
    # Get language preference
    preferred_lang = get_preferred_language(accept_language, language)
    
    # Return message in the preferred language
    if preferred_lang == "ro":
        return {"message": "Endpoint-ul de test API funcționează", "language": "ro"}
    else:
        return {"message": "API test endpoint is working", "language": "en"}

@router.get("/articles", response_model=List[dict])
def test_get_articles(db: Session = Depends(get_db)):
    """Simple test endpoint to get all articles without authentication."""
    try:
        articles = db.query(NewsArticle).all()
        
        # Convert to dict for easier debugging
        article_list = []
        for article in articles:
            article_dict = {
                "id": article.id,
                "title": article.title,
                "slug": article.slug,
                "excerpt": article.excerpt,
                "author_id": article.author_id,
                "created_at": article.created_at,
            }
            article_list.append(article_dict)
            
        return article_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving articles: {str(e)}"
        )

@router.post("/article", status_code=status.HTTP_201_CREATED)
def test_create_article(db: Session = Depends(get_db)):
    """Simple test endpoint to create an article without authentication."""
    try:
        # Get the admin user (for author_id)
        users = db.query(User).all()
        
        # Debug user info
        print(f"Available users: {[{'id': u.id, 'email': u.email} for u in users]}")
        
        # Find an admin user, or use the first user, or use ID 1
        admin_user = next((u for u in users if u.is_admin), users[0] if users else None)
        author_id = admin_user.id if admin_user else 1
        
        # Create a test article
        now = datetime.datetime.utcnow()
        test_article = NewsArticle(
            title=f"Test Article {now.strftime('%Y-%m-%d %H:%M:%S')}",
            slug=f"test-article-{now.strftime('%Y%m%d%H%M%S')}",
            excerpt="This is a test article created via the test endpoint",
            content="<p>Test content created for debugging purposes</p><p>This article was automatically generated.</p>",
            published=True,
            published_date=now,
            created_at=now,
            updated_at=now,
            author_id=author_id
        )
        
        print(f"Creating test article with author_id={author_id}")
        db.add(test_article)
        db.commit()
        db.refresh(test_article)
        
        print(f"Test article created with ID: {test_article.id}")
        return {
            "success": True,
            "article_id": test_article.id,
            "title": test_article.title,
            "author_id": test_article.author_id
        }
    except Exception as e:
        print(f"Error in test_create_article: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating test article: {str(e)}"
        )

@router.delete("/article/{article_id}", status_code=status.HTTP_200_OK)
def test_delete_article(article_id: int, db: Session = Depends(get_db)):
    """Simple test endpoint to delete an article without authentication."""
    try:
        # Find the article
        article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
        
        if not article:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Article with ID {article_id} not found"
            )
        
        # Delete the article
        db.delete(article)
        db.commit()
        
        return {
            "success": True,
            "message": f"Article with ID {article_id} deleted successfully"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting article: {str(e)}"
        )

@router.put("/article/{article_id}", status_code=status.HTTP_200_OK)
def test_update_article(article_id: int, db: Session = Depends(get_db)):
    """Simple test endpoint to update an article without authentication."""
    try:
        # Find the article
        article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
        
        if not article:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Article with ID {article_id} not found"
            )
        
        # Update the article
        now = datetime.datetime.utcnow()
        article.title = f"Updated Article {now}"
        article.excerpt = f"This article was updated at {now}"
        article.updated_at = now
        
        db.commit()
        db.refresh(article)
        
        return {
            "success": True,
            "article_id": article.id,
            "title": article.title,
            "updated_at": article.updated_at
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating article: {str(e)}"
        )