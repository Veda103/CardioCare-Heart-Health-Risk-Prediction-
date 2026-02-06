#!/usr/bin/env python3
"""
Test authentication endpoints to verify they're working correctly
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_registration():
    """Test user registration"""
    print("🧪 Testing Registration...")
    
    # Test data
    test_user = {
        "fullName": "Test Registration User",
        "email": "testreg@example.com", 
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 201:
            print("   ✅ Registration successful")
            return True
        else:
            print("   ❌ Registration failed")
            return False
            
    except Exception as e:
        print(f"   ❌ Registration error: {e}")
        return False

def test_login():
    """Test user login"""
    print("\n🧪 Testing Login...")
    
    # Use one of our test users
    login_data = {
        "email": "test@example.com",
        "password": "test123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            print("   ✅ Login successful")
            return response.json().get('token')
        else:
            print("   ❌ Login failed")
            return None
            
    except Exception as e:
        print(f"   ❌ Login error: {e}")
        return None

def test_profile(token):
    """Test profile access with token"""
    if not token:
        print("\n⚠️ Skipping profile test - no token available")
        return
    
    print("\n🧪 Testing Profile Access...")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(f"{BASE_URL}/api/users/me", headers=headers)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            print("   ✅ Profile access successful")
        else:
            print("   ❌ Profile access failed")
            
    except Exception as e:
        print(f"   ❌ Profile access error: {e}")

def main():
    """Run all authentication tests"""
    print("🚀 Testing Authentication Flow")
    print("=" * 50)
    
    # Test registration
    test_registration()
    
    # Test login
    token = test_login()
    
    # Test profile access
    test_profile(token)
    
    print("\n" + "=" * 50)
    print("🎯 Test Summary:")
    print("   Registration: Creates new user account")
    print("   Login: Authenticates existing user")  
    print("   Profile: Access user data with JWT token")
    print("\n💡 Available test users:")
    print("   Email: test@example.com, Password: test123")
    print("   Email: john.doe@example.com, Password: password123")

if __name__ == "__main__":
    main()