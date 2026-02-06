#!/usr/bin/env python3
"""
Simple test to verify our Flask backend setup is working
"""

import sys
import os

def test_imports():
    """Test that all modules can be imported"""
    print("🧪 Testing Flask Backend Setup")
    print("=" * 40)
    
    try:
        print("📦 Testing Flask imports...")
        from flask import Flask, request, jsonify
        print("   ✅ Flask imported successfully")
        
        print("📦 Testing authentication imports...")
        import jwt
        print("   ✅ PyJWT imported successfully")
        
        print("📦 Testing environment imports...")
        from dotenv import load_dotenv
        print("   ✅ python-dotenv imported successfully")
        
        print("📦 Testing models imports...")
        from models import User, Assessment
        print("   ✅ Models imported successfully")
        
        return True
        
    except ImportError as e:
        print(f"   ❌ Import error: {e}")
        print("\n💡 Solution: Install requirements with:")
        print("   pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"   ❌ Other error: {e}")
        return False

def test_configuration():
    """Test configuration without database connection"""
    print("\n⚙️  Testing configuration...")
    
    try:
        # Test environment loading
        from dotenv import load_dotenv
        load_dotenv()
        
        # Test JWT configuration
        JWT_SECRET = os.getenv('JWT_SECRET', 'test-secret-key')
        JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', '24'))
        
        print(f"   ✅ JWT secret configured (length: {len(JWT_SECRET)} chars)")
        print(f"   ✅ JWT expiration: {JWT_EXPIRATION_HOURS} hours")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Configuration error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Flask Backend Tests...\n")
    
    # Test imports
    if not test_imports():
        print("\n❌ Import tests failed!")
        return False
    
    # Test configuration
    if not test_configuration():
        print("\n❌ Configuration tests failed!")
        return False
    
    print("\n🎉 All tests passed!")
    print("\nNext steps:")
    print("1. Install requirements: pip install -r requirements.txt")
    print("2. Set up database: Copy .env.example to .env and configure database")
    print("3. Initialize database: python init_db.py")
    print("4. Start server: python app.py")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)