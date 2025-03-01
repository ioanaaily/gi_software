#!/bin/bash

# Script to modify the frontend code to remove the Admin link from the navbar
# while keeping the Admin page accessible by URL

# Navigate to frontend directory
cd ../frontend || exit

# Find and modify the Navbar component to remove Admin link
echo "Removing Admin link from Navbar..."

# Simple search for the navbar component
NAVBAR_FILE=$(find src -type f -name "*.js" -o -name "*.jsx" | xargs grep -l "NavLink.*Admin\|Link.*Admin" | head -1)

if [ -n "$NAVBAR_FILE" ]; then
  echo "Found Navbar in: $NAVBAR_FILE"
  
  # Make a backup
  cp "$NAVBAR_FILE" "${NAVBAR_FILE}.bak"
  
  # Remove the Admin NavLink - this pattern will look for NavLink containing Admin and remove the whole line
  sed -i.bak '/NavLink.*Admin\|Link.*Admin\|to="\/admin"/d' "$NAVBAR_FILE"
  
  echo "Admin page is still accessible by direct URL (/admin)"
  echo "Successfully removed Admin link from Navbar"
else
  echo "Could not find Navbar component with Admin link."
  echo "Please check your frontend code structure and modify manually:"
  echo "1. Find your Navbar component"
  echo "2. Remove the NavLink or Link that points to the Admin page"
  echo "3. Leave the Admin page component intact so it's still accessible by URL"
fi

# Clean up backup files
find src -name "*.bak" -delete

echo "Done!"