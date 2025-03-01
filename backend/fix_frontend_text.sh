#!/bin/bash

# Script to fix text in navbar, about, and admin sections in frontend

echo "This script requires manual review of the changes."
echo "It will help you locate and edit the text that needs to be changed."
echo "=================="

# Navigate to frontend directory
cd ../frontend || exit

# Create a directory for backups
mkdir -p ./backups/$(date +%Y%m%d%H%M%S)
BACKUP_DIR="./backups/$(ls -1t ./backups | head -1)"

echo "Backups will be saved to: $BACKUP_DIR"

# Function to safely search for files
find_files() {
  find src -type f -name "*.js" -o -name "*.jsx" -o -name "*.html" -o -name "*.css" | grep -v "node_modules"
}

# Find files that contain "2025"
MATCHING_FILES=$(find_files | xargs grep -l "2025")

if [ -z "$MATCHING_FILES" ]; then
  echo "No files with '2025' text found."
  exit 0
fi

echo "Found these files containing '2025':"
for FILE in $MATCHING_FILES; do
  echo "- $FILE"
done

echo "=================="
echo "Showing contexts where '2025' appears:"
for FILE in $MATCHING_FILES; do
  echo ""
  echo "File: $FILE"
  grep -n -B 2 -A 2 "2025" "$FILE"
  
  # Create backup
  cp "$FILE" "$BACKUP_DIR/$(basename "$FILE").bak"
  
  # Ask user if they want to edit this file
  read -p "Edit this file? (y/n): " EDIT
  if [ "$EDIT" = "y" ]; then
    # Ask user how they want to replace the text
    echo "How would you like to replace the text containing '2025'?"
    echo "1) Replace with current year (2024)"
    echo "2) Remove the year completely"
    echo "3) Replace with custom text"
    echo "4) Skip this file"
    read -p "Choice (1-4): " CHOICE
    
    case $CHOICE in
      1)
        # Replace with current year
        sed -i 's/2025/2024/g' "$FILE"
        echo "Replaced '2025' with '2024' in $FILE"
        ;;
      2)
        # Remove the year - ask for confirmation of each instance
        LINE_NUMS=$(grep -n "2025" "$FILE" | cut -d: -f1)
        for LINE in $LINE_NUMS; do
          LINE_CONTENT=$(sed "${LINE}q;d" "$FILE")
          echo "Line $LINE: $LINE_CONTENT"
          read -p "Remove '2025' from this line? (y/n): " REMOVE
          if [ "$REMOVE" = "y" ]; then
            sed -i "${LINE}s/2025//g" "$FILE"
            echo "Removed '2025' from line $LINE"
          fi
        done
        ;;
      3)
        # Custom replacement
        read -p "Enter custom text to replace '2025': " CUSTOM
        sed -i "s/2025/$CUSTOM/g" "$FILE"
        echo "Replaced '2025' with '$CUSTOM' in $FILE"
        ;;
      4)
        echo "Skipping $FILE"
        ;;
      *)
        echo "Invalid choice, skipping $FILE"
        ;;
    esac
  fi
done

echo "=================="
echo "All changes have been applied. Backups were saved to: $BACKUP_DIR"
echo "Please review the changes and test your application to ensure everything works correctly."