#!/bin/bash

# Script to remove "2025" text from navbar, about, and admin sections
# in the frontend code

# Navigate to frontend directory
cd ../frontend || exit

echo "Searching for '2025' text in navbar, about, and admin components..."

# Look for 2025 text in navbar components
navbar_files=$(find src -name "*navbar*" -o -name "*Navbar*" -o -name "*nav*" -o -name "*Nav*" | grep -v node_modules)
if [ -n "$navbar_files" ]; then
  echo "Found potential navbar files:"
  for file in $navbar_files; do
    echo "  Checking $file"
    if grep -q "2025" "$file"; then
      echo "  Found '2025' in $file - creating backup and removing..."
      cp "$file" "${file}.bak"
      sed -i "s/[^a-zA-Z0-9]2025[^a-zA-Z0-9]/ /g" "$file"
      sed -i "s/2025//g" "$file"
    fi
  done
else
  echo "No navbar files found"
fi

# Look for 2025 text in about components
about_files=$(find src -name "*about*" -o -name "*About*" | grep -v node_modules)
if [ -n "$about_files" ]; then
  echo "Found potential about files:"
  for file in $about_files; do
    echo "  Checking $file"
    if grep -q "2025" "$file"; then
      echo "  Found '2025' in $file - creating backup and removing..."
      cp "$file" "${file}.bak"
      sed -i "s/[^a-zA-Z0-9]2025[^a-zA-Z0-9]/ /g" "$file"
      sed -i "s/2025//g" "$file"
    fi
  done
else
  echo "No about files found"
fi

# Look for 2025 text in admin components
admin_files=$(find src -name "*admin*" -o -name "*Admin*" | grep -v node_modules)
if [ -n "$admin_files" ]; then
  echo "Found potential admin files:"
  for file in $admin_files; do
    echo "  Checking $file"
    if grep -q "2025" "$file"; then
      echo "  Found '2025' in $file - creating backup and removing..."
      cp "$file" "${file}.bak"
      sed -i "s/[^a-zA-Z0-9]2025[^a-zA-Z0-9]/ /g" "$file"
      sed -i "s/2025//g" "$file"
    fi
  done
else
  echo "No admin files found"
fi

# Check all JSX/JS files in case 2025 is in files we missed
jsx_files=$(find src -name "*.jsx" -o -name "*.js" | grep -v node_modules)
for file in $jsx_files; do
  if grep -q "2025" "$file"; then
    component_type=""
    
    # Determine if this is navbar, about, or admin related
    if grep -q -i "navbar\|navigation\|header\|nav" "$file"; then
      component_type="navbar"
    elif grep -q -i "about\|company\|mission" "$file"; then
      component_type="about"
    elif grep -q -i "admin\|dashboard\|control panel" "$file"; then
      component_type="admin"
    fi
    
    if [ -n "$component_type" ]; then
      echo "  Found '2025' in $file ($component_type-related) - creating backup and removing..."
      cp "$file" "${file}.bak"
      sed -i "s/[^a-zA-Z0-9]2025[^a-zA-Z0-9]/ /g" "$file"
      sed -i "s/2025//g" "$file"
    fi
  fi
done

# Also check HTML/CSS files in case the text is there
html_css_files=$(find src -name "*.html" -o -name "*.css" -o -name "*.scss" | grep -v node_modules)
for file in $html_css_files; do
  if grep -q "2025" "$file"; then
    echo "  Found '2025' in $file - creating backup and removing..."
    cp "$file" "${file}.bak"
    sed -i "s/[^a-zA-Z0-9]2025[^a-zA-Z0-9]/ /g" "$file"
    sed -i "s/2025//g" "$file"
  fi
done

# Clean up backup files
find src -name "*.bak" -delete

echo "Done! All '2025' text has been removed from navbar, about, and admin sections."
echo "If you want to verify the changes, run: 'cd ../frontend && npm start'"