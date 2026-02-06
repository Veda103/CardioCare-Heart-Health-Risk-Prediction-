#!/usr/bin/env python3
"""
Database Initialization Script for Cardio Care Flask Application

This script initializes the database by creating all necessary tables
and optionally seeding with test data.
"""

import os
import sys
from pathlib import Path

# Add server directory to Python path
server_dir = Path(__file__).parent
sys.path.append(str(server_dir))

from app import app, db
from models import User, Assessment, create_tables, seed_test_data, get_db_stats

def init_database():
    """Initialize database tables"""
    print("🏥 Cardio Care Database Initialization")
    print("=" * 50)
    
    try:
        with app.app_context():
            print("📋 Creating database tables...")
            create_tables(app)
            print("✅ Database tables created successfully!")
            
            # Show database statistics
            stats = get_db_stats()
            print(f"📊 Database Stats:")
            print(f"   Users: {stats['users_count']}")
            print(f"   Assessments: {stats['assessments_count']}")
            
            return True
            
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        return False

def seed_development_data():
    """Seed database with development test data"""
    print("\n🌱 Seeding development data...")
    
    try:
        with app.app_context():
            seed_test_data()
            print("✅ Development data seeded successfully!")
            
            # Show updated stats
            stats = get_db_stats()
            print(f"📊 Updated Database Stats:")
            print(f"   Users: {stats['users_count']}")
            print(f"   Assessments: {stats['assessments_count']}")
            
    except Exception as e:
        print(f"❌ Data seeding failed: {e}")

def reset_database():
    """Reset database by dropping and recreating all tables"""
    print("\n⚠️  RESETTING DATABASE - This will delete all data!")
    response = input("Are you sure? Type 'yes' to continue: ")
    
    if response.lower() != 'yes':
        print("❌ Database reset cancelled.")
        return
    
    try:
        with app.app_context():
            print("🗑️  Dropping all tables...")
            db.drop_all()
            print("📋 Creating fresh tables...")
            db.create_all()
            print("✅ Database reset complete!")
            
    except Exception as e:
        print(f"❌ Database reset failed: {e}")

if __name__ == "__main__":
    print("🚀 Starting database initialization...")
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("⚠️  Warning: .env file not found!")
        print("   Copy .env.example to .env and update the database settings.")
        print("   Continuing with default settings...")
    
    # Initialize database
    if init_database():
        # Ask user if they want to seed development data
        if len(sys.argv) > 1 and sys.argv[1] == '--seed':
            seed_development_data()
        elif len(sys.argv) > 1 and sys.argv[1] == '--reset':
            reset_database()
        else:
            print("\nOptions:")
            print("  python init_db.py --seed    # Add test users")
            print("  python init_db.py --reset   # Reset entire database")
            
        print("\n🎉 Database initialization complete!")
        print("   You can now start the Flask server with: python app.py")
    else:
        sys.exit(1)