#!/bin/bash

echo "🔍 Checking for package.json..."
if [ ! -f package.json ]; then
  echo "❌ No package.json found. Make sure you're in the right project directory."
  exit 1
fi

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules package-lock.json .next

echo "🚀 Clearing npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
npm install

# Check if node_modules was successfully created
if [ -d "node_modules" ]; then
  echo "✅ node_modules directory created successfully!"
else
  echo "❌ Something went wrong. node_modules directory is still missing."
  exit 1
fi

# Check npm version
echo "🛠 Checking npm version..."
npm --version

echo "🎉 All done! Try running your project now."
