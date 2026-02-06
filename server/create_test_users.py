#!/usr/bin/env python3
"""
Create test users for authentication testing
"""

import sys
import os
from pathlib import Path

# Add server directory to Python path
server_dir = Path(__file__).parent
sys.path.append(str(server_dir))

from app import app, db, bcrypt
from models import User

def create_test_users():
    """Create test users for development"""
    print("🧪 Creating test users...")
    
    test_users = [
        {
            'full_name': 'John Doe',
            'email': 'john.doe@example.com',
            'password': 'password123'
        },
        {
            'full_name': 'Jane Smith', 
            'email': 'jane.smith@example.com',
            'password': 'password123'
        },
        {
            'full_name': 'Test User',
            'email': 'test@example.com',
            'password': 'test123'
        }
    ]
    
    with app.app_context():
        for user_data in test_users:
            # Check if user already exists
            existing_user = User.find_by_email(user_data['email'])
            if existing_user:
                print(f"   ⚠️  User {user_data['email']} already exists")
                continue
                
            # Create new user
            password_hash = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
            user = User(
                full_name=user_data['full_name'],
                email=user_data['email'],
                password_hash=password_hash
            )
            db.session.add(user)
            print(f"   ✅ Created user: {user_data['email']}")
        
        try:
            db.session.commit()
            print("✅ Test users created successfully!")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error creating users: {e}")

if __name__ == "__main__":
    create_test_users()
    
    # Show available test users
    print("\n📋 Available test users:")
    print("   Email: test@example.com, Password: test123")
    print("   Email: john.doe@example.com, Password: password123")
    print("   Email: jane.smith@example.com, Password: password123")