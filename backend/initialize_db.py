import asyncio
from database import engine
from models import Base

async def create_tables():
    """Create all database tables defined in models.py."""
    print("Creating database tables...")
    async with engine.begin() as conn:
        # Drop all tables first
        # await conn.run_sync(Base.metadata.drop_all)
        
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    
    print("Database tables created successfully!")

if __name__ == "__main__":
    asyncio.run(create_tables())