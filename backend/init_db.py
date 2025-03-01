import asyncio
import datetime
import sys
import os
import bcrypt

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import engine, get_db
from sqlalchemy.future import select
from models import Base, User, NewsArticle

async def create_tables():
    """Create database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created")

async def create_admin_user():
    """Create an admin user if it doesn't exist."""
    db = await anext(get_db())
    
    # Check if admin user already exists
    query = select(User).where(User.email == "admin@gisoftware.com")
    result = await db.execute(query)
    admin = result.scalars().first()
    
    if admin is None:
        # Create admin user with bcrypt hashed password
        password_bytes = "admin".encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
        
        admin = User(
            email="admin@gisoftware.com",
            password=hashed_password,
            is_admin=True,
            created_at=datetime.datetime.utcnow()
        )
        db.add(admin)
        await db.commit()
        await db.refresh(admin)
        print("Admin user created")
    else:
        print("Admin user already exists")
    
    return admin

async def create_sample_news_articles(admin_id):
    """Create sample news articles."""
    db = await anext(get_db())
    
    # Check if articles already exist
    query = select(NewsArticle)
    result = await db.execute(query)
    if result.scalars().first():
        print("News articles already exist, skipping sample data creation")
        return
    
    # Sample news articles data
    sample_articles = [
        {
            "title": "OCR LLMs: Revolutionizing Document Processing for Small Businesses",
            "excerpt": "New OCR technology powered by large language models can extract and understand document content with unprecedented accuracy, saving hours of manual data entry.",
            "content": """
                <h2>The Power of OCR + LLMs for Small Businesses</h2>
                <p>Document processing has long been a tedious task for businesses of all sizes. Traditional OCR (Optical Character Recognition) technology has helped, but often struggles with complex layouts, handwriting, or specialized terminology.</p>
                <p>The latest breakthrough combines OCR with Large Language Models (LLMs) to not just recognize text, but understand it in context. This means the system can:</p>
                <ul>
                    <li>Extract data from invoices, receipts, and forms with near-human accuracy</li>
                    <li>Understand document structure and relationships between data points</li>
                    <li>Categorize and summarize document content automatically</li>
                    <li>Handle multiple languages and specialized terminology</li>
                </ul>
                <p>For small businesses, this technology is particularly transformative as it drastically reduces the need for manual data entry, allowing staff to focus on higher-value tasks.</p>
                <h2>Real-World Applications</h2>
                <p>Small accounting firms are using OCR LLMs to process client receipts and invoices in seconds rather than hours. Retail businesses are streamlining inventory management by automatically processing supplier documentation. Healthcare providers are extracting patient information from forms with unprecedented accuracy.</p>
                <p>The technology is increasingly accessible through cloud-based solutions with pay-as-you-go pricing models, making it feasible even for businesses with limited IT budgets.</p>
            """,
            "image_url": "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/ocr-llm.jpg",
            "category": "Document Processing",
            "published_date": datetime.datetime.utcnow() - datetime.timedelta(days=5),
        },
        {
            "title": "AI-Driven Customer Service Tools That Small Businesses Can Afford",
            "excerpt": "New generation of AI chatbots are becoming accessible for smaller companies, providing 24/7 support without breaking the bank.",
            "content": """
                <h2>Affordable AI Customer Service Solutions</h2>
                <p>Until recently, sophisticated AI-powered customer service tools were primarily available to large enterprises with substantial technology budgets. That landscape is rapidly changing with a new generation of affordable solutions specifically designed for small and medium-sized businesses.</p>
                <p>These new tools offer:</p>
                <ul>
                    <li>24/7 customer support automation that feels natural and helpful</li>
                    <li>Multi-channel capabilities covering websites, social media, and messaging apps</li>
                    <li>Simple integration with existing systems like CRMs and e-commerce platforms</li>
                    <li>Pay-as-you-grow pricing models starting as low as $50/month</li>
                </ul>
                <p>The technology is powered by the same advanced language models used by larger companies but packaged and priced for smaller operations.</p>
                <h2>Implementation Without IT Expertise</h2>
                <p>One of the most significant advancements is the ease of implementation. Many of these new tools feature no-code setup processes, allowing business owners to create sophisticated customer service chatbots by simply answering questions about their business and providing existing FAQs or support documentation.</p>
                <p>The AI does the heavy lifting by learning from this information and automatically creating appropriate responses to customer queries. As the system interacts with customers, it continuously improves its understanding and responses.</p>
            """,
            "image_url": "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/customer-service-ai.jpg",
            "category": "Customer Support",
            "published_date": datetime.datetime.utcnow() - datetime.timedelta(days=10),
        },
        {
            "title": "Small Business AI: Predictive Analytics Without Data Scientists",
            "excerpt": "New tools allow small businesses to leverage their existing data for predictive insights without needing specialized data science teams.",
            "content": """
                <h2>Democratizing Predictive Analytics</h2>
                <p>Predictive analytics used to require a team of data scientists and substantial investment. New AI-powered tools are changing that reality, making sophisticated prediction capabilities accessible to small businesses without specialized technical staff.</p>
                <p>These accessible predictive analytics tools can help with:</p>
                <ul>
                    <li>Anticipating inventory needs based on historical sales and seasonal patterns</li>
                    <li>Identifying customers at risk of churning before they leave</li>
                    <li>Predicting maintenance needs for equipment before failures occur</li>
                    <li>Forecasting staffing requirements based on business patterns</li>
                </ul>
                <p>The technology leverages pre-built models that can be quickly adapted to specific business needs with minimal configuration.</p>
                <h2>Getting Started with Existing Data</h2>
                <p>Most small businesses already have the data they need to benefit from predictive analytics. Sales records, customer information, inventory movements, and equipment maintenance logs all contain valuable patterns that predictive models can identify.</p>
                <p>Modern tools connect directly to common business systems like QuickBooks, Shopify, Salesforce, and others to automatically import and analyze data. Results are presented through intuitive dashboards designed for business users rather than technical experts.</p>
            """,
            "image_url": "https://ioana-ocr-data-bucket.s3.eu-central-1.amazonaws.com/news/predictive-analytics.jpg",
            "category": "Analytics",
            "published_date": datetime.datetime.utcnow() - datetime.timedelta(days=15),
        },
    ]
    
    # Create news articles
    for article_data in sample_articles:
        # Create slug from title
        slug = article_data["title"].lower().replace(" ", "-")
        slug = ''.join(c for c in slug if c.isalnum() or c == '-')
        
        # Create article
        article = NewsArticle(
            title=article_data["title"],
            slug=slug,
            excerpt=article_data["excerpt"],
            content=article_data["content"],
            image_url=article_data["image_url"],
            category=article_data["category"],
            published=True,
            published_date=article_data["published_date"],
            author_id=admin_id
        )
        db.add(article)
    
    await db.commit()
    print("Sample news articles created")

async def init_db():
    """Initialize the database with tables and sample data."""
    # Create tables
    await create_tables()
    
    # Create admin user
    admin = await create_admin_user()
    
    # Create sample news articles
    await create_sample_news_articles(admin.id)
    
    print("Database initialized successfully")

async def init_db_async():
    """Async function to initialize the database, for use from other modules."""
    await init_db()

if __name__ == "__main__":
    asyncio.run(init_db())
