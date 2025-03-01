#!/bin/bash

# Script to fix the login URL in Admin.js

# Navigate to frontend directory
cd ../frontend || exit

# Find the Admin.js file
ADMIN_FILE="src/pages/Admin.js"

if [ -f "$ADMIN_FILE" ]; then
  echo "Found Admin.js, creating backup..."
  cp "$ADMIN_FILE" "${ADMIN_FILE}.bak"
  
  # Replace the login API URL with the correct one
  echo "Looking for API URL patterns in Admin.js..."
  
  # Find possible incorrect API endpoint patterns and replace them
  if grep -q "api/login" "$ADMIN_FILE"; then
    echo "Found incorrect 'api/login' endpoint, replacing with correct endpoint..."
    sed -i.bak 's|api/login|api/auth/login|g' "$ADMIN_FILE"
  fi
  
  if grep -q "/login" "$ADMIN_FILE"; then
    echo "Found potential '/login' endpoint, replacing with correct endpoint..."
    sed -i.bak 's|/login|/api/auth/login|g' "$ADMIN_FILE"
  fi
  
  # Make sure there's http://localhost:8000 in the URL
  if ! grep -q "http://localhost:8000" "$ADMIN_FILE" && grep -q "axios" "$ADMIN_FILE"; then
    echo "No base URL found, adding base URL to axios calls..."
    sed -i.bak 's|axios\.post\("|axios.post("http://localhost:8000|g' "$ADMIN_FILE"
  fi
  
  echo "Updating axios response error handling..."
  if grep -q "handleLogin" "$ADMIN_FILE"; then
    HANDLE_LOGIN=$(grep -n "handleLogin" "$ADMIN_FILE" | head -1 | cut -d: -f1)
    if [ -n "$HANDLE_LOGIN" ]; then
      echo "Found handleLogin function at line $HANDLE_LOGIN"
      
      # Create a temporary file with improved error handling
      TMP_FILE=$(mktemp)
      cat > "$TMP_FILE" << 'EOL'
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Use the correct endpoint URL
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Login successful:", response.data);
      
      // Store the token and user info
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("isAdmin", response.data.is_admin);
      
      // Redirect to admin panel
      setLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err);
      
      // Show detailed error message
      if (err.response) {
        console.log("Error response:", err.response.data);
        setError(`Authentication failed: ${err.response.status} ${err.response.data.detail || JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        setError("No response from server. Please check if the backend is running.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
EOL

      # Find the handleLogin function and replace it with our improved version
      LINE_START=$HANDLE_LOGIN
      LINE_END=$(grep -n "const handleLogout" "$ADMIN_FILE" | head -1 | cut -d: -f1)
      
      if [ -z "$LINE_END" ]; then
        # If we couldn't find handleLogout, try finding the next function or component
        LINE_END=$(grep -n "return (" "$ADMIN_FILE" | head -1 | cut -d: -f1)
      fi
      
      if [ -n "$LINE_END" ] && [ "$LINE_END" -gt "$LINE_START" ]; then
        echo "Replacing handleLogin function (lines $LINE_START to $((LINE_END-1)))..."
        sed -i.bak "${LINE_START},${LINE_END}s/.*const handleLogin.*/${LINE_END}r $TMP_FILE/" "$ADMIN_FILE"
        echo "Updated handleLogin function with improved error handling"
      else
        echo "Could not safely locate the handleLogin function boundaries"
        echo "Please manually update the login code to use: http://localhost:8000/api/auth/login"
      fi
      
      rm "$TMP_FILE"
    fi
  else
    echo "Could not find handleLogin function to update"
  fi
else
  echo "Admin.js not found at expected location: $ADMIN_FILE"
  echo "Searching for Admin.js..."
  
  # Try to find Admin.js elsewhere
  ADMIN_FILE=$(find src -type f -name "Admin.js" | head -1)
  
  if [ -n "$ADMIN_FILE" ]; then
    echo "Found Admin.js at: $ADMIN_FILE"
    echo "Please manually update the login URL in this file"
    echo "The correct URL should be: http://localhost:8000/api/auth/login"
  else
    echo "Could not find Admin.js in the frontend directory"
    echo "Please manually update the login URL in your Admin component"
    echo "The correct URL should be: http://localhost:8000/api/auth/login"
  fi
fi

# Clean up backup files
find src -name "*.bak" -delete

echo "Done!"