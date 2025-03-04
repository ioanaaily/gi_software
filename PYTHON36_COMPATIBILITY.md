# Python 3.6 Compatibility Guide

This document outlines the changes made to ensure the GI Software project works with Python 3.6.

## Key Changes Made

### 1. Database Layer
- Replaced SQLAlchemy's async ORM (requires Python 3.7+) with traditional synchronous SQLAlchemy ORM
- Changed to traditional session handling instead of async context managers
- Updated database connection string to use MySQL with pymysql driver instead of PostgreSQL

### 2. FastAPI Routes
- Converted `async def` route handlers to regular `def` functions
- Removed `await` keywords from database operations
- Updated dependency injection to use synchronous session objects

### 3. Package Dependencies
- Downgraded package versions to be compatible with Python 3.6:
  - FastAPI < 0.69.0
  - Uvicorn < 0.15.0
  - SQLAlchemy < 1.4.0
  - Replaced asyncpg with pymysql for MySQL support
  - Added cryptography (required for pymysql)
- Added backporting packages needed for Python 3.6:
  - dataclasses (backport)
  - typing_extensions

## Running the Application

The process for running the application remains the same:

```bash
# Initialize the database
python init_db.py

# Run the FastAPI server
uvicorn main:app --reload
```

## Migrating Back to Python 3.7+

If you need to migrate back to Python 3.7+ in the future, you would need to:

1. Restore the `async`/`await` syntax in route handlers
2. Update the database layer to use SQLAlchemy's async ORM
3. Restore the async session management with context managers
4. Update package dependencies to latest versions

## Known Limitations

- Performance may be slightly lower without async I/O capabilities
- Some more advanced FastAPI features might not be available
- Type annotations are more limited in Python 3.6