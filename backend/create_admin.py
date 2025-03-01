import asyncio
import bcrypt
from database import engine, get_db, AsyncSessionLocal
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import User
import datetime

async def create_admin_user():
    """Update database schema and create admin user."""
    # Import the hash_password function from auth.py
    from api.auth import hash_password
    
    async with AsyncSessionLocal() as db:
        # Add columns to the User table if they don't exist
        await db.execute(text("ALTER TABLE \"user\" ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE"))
        await db.execute(text("ALTER TABLE \"user\" ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"))
        
        try:
            # Hash the admin password with bcrypt
            hashed_password = hash_password("admin")
            
            # Check if admin user exists
            result = await db.execute(text("SELECT COUNT(*) FROM \"user\" WHERE email = 'admin@gisoftware.com'"))
            count = result.scalar()
            
            if count == 0:
                # Create new admin user with ORM to handle hashed password
                admin_user = User(
                    email="admin@gisoftware.com",
                    password=hashed_password,
                    is_admin=True,
                    created_at=datetime.datetime.utcnow()
                )
                db.add(admin_user)
                print("Admin user created with bcrypt hashed password")
            else:
                # Update existing admin user with bcrypt
                await db.execute(
                    text("""
                    UPDATE "user" 
                    SET 
                        is_admin = TRUE,
                        password = :password
                    WHERE email = 'admin@gisoftware.com'
                    """),
                    {"password": hashed_password}
                )
                print("Admin user updated with bcrypt hashed password")
            
            await db.commit()
            print("Database updated successfully")
            
            # Print details
            result = await db.execute(text("SELECT id, email, is_admin FROM \"user\" WHERE email = 'admin@gisoftware.com'"))
            admin = result.fetchone()
            if admin:
                print(f"Admin user details:")
                print(f"  ID: {admin[0]}")
                print(f"  Email: {admin[1]}")
                print(f"  Is Admin: {admin[2]}")
                print(f"  Password: [bcrypt hashed]")
            
        except Exception as e:
            print(f"Error creating admin user: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(create_admin_user())