import asyncio
import requests
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

# Import backend modules
from database import AsyncSessionLocal
from models import User

async def test_login_api():
    """Test login API directly from server."""
    print("Testing server login API...")
    
    try:
        # Connect to localhost API
        response = requests.post(
            "http://localhost:8000/api/auth/login",
            json={
                "email": "admin@gisoftware.com",
                "password": "admin"
            },
            timeout=5
        )
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing API: {e}")
        return False

async def check_db_admin():
    """Check if admin exists in database and fix if needed."""
    print("\nChecking admin user in database...")
    
    async with AsyncSessionLocal() as db:
        try:
            # Check if admin exists
            query = select(User).where(User.email == "admin@gisoftware.com")
            result = await db.execute(query)
            admin = result.scalars().first()
            
            if not admin:
                print("Admin user not found. Creating new admin user...")
                
                # Create admin
                from api.auth import hash_password
                admin = User(
                    email="admin@gisoftware.com",
                    password="admin",  # Plain text for special case login
                    is_admin=True
                )
                db.add(admin)
                await db.commit()
                print("Admin user created successfully")
            else:
                print(f"Admin user found (ID: {admin.id})")
                
                # Update admin to ensure login works
                admin.is_admin = True
                # Use bcrypt hashed password
                from api.auth import hash_password
                admin.password = hash_password("admin")
                await db.commit()
                print("Admin user updated with bcrypt hashed password")
            
            return True
        except Exception as e:
            print(f"Database error: {e}")
            return False

async def main():
    """Run all checks and fixes."""
    print("ADMIN LOGIN FIX UTILITY")
    print("=======================")
    
    # Check database admin
    db_ok = await check_db_admin()
    
    # Test API login
    api_ok = await test_login_api()
    
    # Summary
    print("\nFIX SUMMARY")
    print("===========")
    print(f"Database Check: {'✅ PASSED' if db_ok else '❌ FAILED'}")
    print(f"API Login Test: {'✅ PASSED' if api_ok else '❌ FAILED'}")
    
    if db_ok and api_ok:
        print("\n✅ Admin login should now be working")
        print("Access the admin page at: http://localhost:3000/admin")
        print("Use these credentials:")
        print("  Email: admin@gisoftware.com")
        print("  Password: admin")
    else:
        print("\n❌ Some issues still exist with admin login")
        print("Review errors above for more information")
    
    # Print frontend instructions
    print("\nFRONTEND CHECKING INSTRUCTIONS")
    print("=============================")
    print("1. Check if Admin.js is making requests to the correct URL")
    print("2. Try updating the login URL in Admin.js to: http://localhost:8000/api/auth/login")
    print("3. Check browser console for CORS errors")
    print("4. Verify that the React app is running on http://localhost:3000")

if __name__ == "__main__":
    asyncio.run(main())