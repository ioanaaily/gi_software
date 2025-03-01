"""
Setup script for GI Software backend.
Run this script to install dependencies and initialize the database.
"""
import subprocess
import sys
import os

def install_dependencies():
    """Install Python dependencies from requirements.txt"""
    print("Installing Python dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    print("Dependencies installed successfully!")

def initialize_database():
    """Initialize the database tables"""
    print("Initializing database...")
    try:
        from init_db import init_db_async
        import asyncio
        asyncio.run(init_db_async())
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")
        print("Make sure the database connection settings in .env file are correct.")

def main():
    """Main setup function"""
    print("Setting up GI Software backend...")
    
    # Install dependencies
    install_dependencies()
    
    # Initialize database
    initialize_database()
    
    print("\nSetup complete!")
    print("To run the backend server, use: uvicorn backend.main:app --reload")

if __name__ == "__main__":
    main()