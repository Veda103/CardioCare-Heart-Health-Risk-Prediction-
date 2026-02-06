#!/usr/bin/env python3
"""
Simple test using only built-in Python libraries
"""

import json
import urllib.request
import urllib.parse

BASE_URL = "http://localhost:5000"

def make_request(url, data=None, method='GET', headers=None):
    """Make HTTP request using urllib"""
    if headers is None:
        headers = {'Content-Type': 'application/json'}
    
    if data:
        data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            return response.getcode(), json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))
    except Exception as e:
        return None, str(e)

def test_login():
    """Test login endpoint"""
    print("🧪 Testing Login with test user...")
    
    login_data = {
        "email": "test@example.com",
        "password": "test123"
    }
    
    status, response = make_request(f"{BASE_URL}/api/auth/login", login_data, 'POST')
    print(f"   Status: {status}")
    print(f"   Response: {response}")
    
    if status == 200 and 'token' in response:
        print("   ✅ Login successful!")
        return response['token']
    else:
        print("   ❌ Login failed")
        return None

def test_profile(token):
    """Test profile access"""
    if not token:
        return
    
    print("\n🧪 Testing Profile Access...")
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    status, response = make_request(f"{BASE_URL}/api/users/me", headers=headers)
    print(f"   Status: {status}")
    print(f"   Response: {response}")
    
    if status == 200:
        print("   ✅ Profile access successful!")
    else:
        print("   ❌ Profile access failed")

if __name__ == "__main__":
    print("🚀 Testing Authentication with Built-in Libraries")
    print("=" * 60)
    
    token = test_login()
    test_profile(token)
    
    print("\n" + "=" * 60)
    print("💡 Test users available:")
    print("   Email: test@example.com, Password: test123")
    print("   Email: john.doe@example.com, Password: password123")