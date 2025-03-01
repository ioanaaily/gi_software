#!/bin/bash

# Go to the frontend directory
cd ../frontend || exit

# Clean up node_modules and package-lock
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

# Clear NPM cache
echo "Clearing NPM cache..."
npm cache clean --force
npm cache verify

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Start the development server
echo "Starting development server..."
npm start