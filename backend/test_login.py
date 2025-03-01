import requests
import json

print("Testing login with JSON...")
json_response = requests.post(
    "http://127.0.0.1:8000/api/auth/login",
    headers={"Content-Type": "application/json"},
    data=json.dumps({
        "email": "admin@gisoftware.com",
        "password": "admin"
    })
)
print(f"JSON Status: {json_response.status_code}")
print(f"JSON Response: {json_response.text}")

print("\nTesting login with form data...")
form_response = requests.post(
    "http://127.0.0.1:8000/api/auth/login-form",
    data={
        "email": "admin@gisoftware.com",
        "password": "admin"
    }
)
print(f"Form Status: {form_response.status_code}")
print(f"Form Response: {form_response.text}")