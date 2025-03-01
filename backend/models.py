from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import datetime

# Import Base from database.py to avoid duplication
from database import Base

class Service(Base):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

class ContactMessage(Base):
    __tablename__ = "contact_message"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(String)

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # bcrypt hashed password
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationship
    news_articles = relationship("NewsArticle", back_populates="author")

class NewsArticle(Base):
    __tablename__ = "news_article"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, index=True, unique=True)  # URL-friendly title
    excerpt = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String)
    category = Column(String, index=True)
    published = Column(Boolean, default=True)
    published_date = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    author_id = Column(Integer, ForeignKey("user.id"))
    
    # Relationship
    author = relationship("User", back_populates="news_articles")