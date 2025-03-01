#!/bin/bash

# Script to remove "2025" from the GI SOFTWARE title in the navbar

# Navigate to frontend directory
cd ../frontend || exit

echo "Looking for navbar component with '2025' text..."

# Find navbar component files
NAVBAR_FILES=$(find src -type f -name "*.js" -o -name "*.jsx" | grep -i "nav\|header" | grep -v "node_modules")

for FILE in $NAVBAR_FILES; do
  echo "Checking: $FILE"
  
  # Look for GI SOFTWARE with 2025 text
  if grep -q "2025.*GI SOFTWARE\|GI SOFTWARE.*2025" "$FILE"; then
    echo "Found '2025' with 'GI SOFTWARE' in $FILE"
    
    # Create backup
    cp "$FILE" "${FILE}.bak"
    
    # Replace the text - remove 2025 but keep GI SOFTWARE
    sed -i 's/2025 GI SOFTWARE/GI SOFTWARE/g' "$FILE"
    sed -i 's/GI SOFTWARE 2025/GI SOFTWARE/g' "$FILE"
    sed -i 's/2025-GI SOFTWARE/GI SOFTWARE/g' "$FILE"
    sed -i 's/GI SOFTWARE-2025/GI SOFTWARE/g' "$FILE"
    
    echo "Removed '2025' from navbar title in $FILE"
  fi
done

echo "Done! The '2025' text should be removed from the navbar title."