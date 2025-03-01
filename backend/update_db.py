import asyncio
from database import engine
from models import Base

async def update_tables():
    """Update database schema."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables updated")

if __name__ == "__main__":
    asyncio.run(update_tables())