"""
Configuration settings for the backend application.
"""
import os
from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Base settings
    APP_NAME: str = "GI Software API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = ENVIRONMENT == "development"
    
    # API Settings
    API_PREFIX: str = "/api"
    
    # CORS Settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ] if DEBUG else [
        # Add your production domain(s) here
        "https://your-domain.com",
        "https://www.your-domain.com",
        # Or use "*" for all origins (less secure)
    ]
    
    # Database Settings
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://root:@localhost:3306/gi_software"
    )
    
    # Security Settings
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", 
        "H4568459333sEdCvFrTgBnHyUjMiKoL123!@#"  # Change in production!
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Others
    DEFAULT_ADMIN_EMAIL: str = "admin@gisoftware.com"
    DEFAULT_ADMIN_PASSWORD: str = "admin"  # Change in production!
    
    class Config:
        # Load .env file if it exists
        env_file = ".env"
        
# Create a global settings object
settings = Settings()