from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.contact import router as contact_router
from api.auth import router as auth_router
from api.news import router as news_router
from api.test import router as test_router
from api.translations import router as translations_router

app = FastAPI()

# Define allowed origins based on environment
import os

# Get environment-specific settings
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"

# Define allowed origins based on environment
if DEBUG:
    # Development - Allow React dev server
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
else:
    # Production - Allow your production domains
    ALLOWED_ORIGINS = [
        # Add your production domain(s) here
        "https://gi-software.com",
        "https://www.gi-software.com",
    ]

# Add CORS Middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Register API Routes
app.include_router(contact_router, prefix="/api/contact", tags=["Contact"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(news_router, prefix="/api/news", tags=["News"])
app.include_router(test_router, prefix="/api/test", tags=["Test"])
app.include_router(translations_router, prefix="/api/translations", tags=["Translations"])

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running!"}
