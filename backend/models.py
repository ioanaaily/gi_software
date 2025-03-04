from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import datetime

# Import Base from database.py to avoid duplication
from database import Base

class Service(Base):
    __tablename__ = "service"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(1000))

class ContactMessage(Base):
    __tablename__ = "contact_message"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), index=True)
    message = Column(String(2000))

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)  # bcrypt hashed password
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationship
    news_articles = relationship("NewsArticle", back_populates="author")

class NewsArticle(Base):
    __tablename__ = "news_article"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, nullable=False)
    slug = Column(String(255), index=True, unique=True)  # URL-friendly title
    excerpt = Column(String(500), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(500))
    category = Column(String(100), index=True)
    published = Column(Boolean, default=True)
    published_date = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    author_id = Column(Integer, ForeignKey("user.id"))
    
    # Relationship
    author = relationship("User", back_populates="news_articles")