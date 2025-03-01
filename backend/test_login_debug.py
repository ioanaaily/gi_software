import requests
import json
import time

def test_login_endpoints():
    """Test all possible login endpoints with detailed debugging."""
    base_url = "http://localhost:8000"
    endpoints = [
        "/api/auth/login",
        "/api/login",
        "/api/auth/login-form",
        "/auth/login",
        "/login"
    ]
    
    data = {
        "email": "admin@gisoftware.com",
        "password": "admin"
    }
    
    # Test JSON login on all endpoints
    print("TESTING JSON LOGIN ON ALL POSSIBLE ENDPOINTS")
    print("============================================")
    for endpoint in endpoints:
        url = f"{base_url}{endpoint}"
        print(f"\nTrying endpoint: {url}")
        try:
            print(f"  POST request with data: {json.dumps(data)}")
            print(f"  Headers: {{'Content-Type': 'application/json'}}")
            
            response = requests.post(
                url, 
                headers={"Content-Type": "application/json"},
                json=data,
                timeout=2
            )
            
            print(f"  Status code: {response.status_code}")
            print(f"  Response: {response.text[:500]}")
            
            if response.status_code == 200:
                print("  SUCCESS: This endpoint works for JSON login!")
            
        except Exception as e:
            print(f"  Error: {str(e)}")
    
    # Test form login on all endpoints
    print("\n\nTESTING FORM LOGIN ON ALL POSSIBLE ENDPOINTS")
    print("============================================")
    for endpoint in endpoints:
        url = f"{base_url}{endpoint}"
        print(f"\nTrying endpoint: {url}")
        try:
            print(f"  POST request with form data: {data}")
            
            response = requests.post(
                url, 
                data=data,
                timeout=2
            )
            
            print(f"  Status code: {response.status_code}")
            print(f"  Response: {response.text[:500]}")
            
            if response.status_code == 200:
                print("  SUCCESS: This endpoint works for form login!")
            
        except Exception as e:
            print(f"  Error: {str(e)}")
    
    print("\n\nSUMMARY OF WORKING ENDPOINTS")
    print("===========================")
    print("Copy these details for your React app:")
    
    # Check the main JSON endpoint again for final test
    try:
        url = f"{base_url}/api/auth/login"
        response = requests.post(url, json=data)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Login Endpoint: {url}")
            print(f"✅ Method: POST with JSON body")
            print(f"✅ Data format: {json.dumps(data)}")
            print(f"✅ Response format:")
            print(json.dumps(result, indent=2))
        else:
            print("❌ Main endpoint not working, please check server logs")
    except Exception as e:
        print(f"❌ Error testing main endpoint: {str(e)}")

if __name__ == "__main__":
    print("Starting login endpoint test...")
    test_login_endpoints()
    print("\nTest complete!")