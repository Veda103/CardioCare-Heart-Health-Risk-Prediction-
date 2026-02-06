#!/bin/bash
# Setup script for Python Flask backend

echo "🐍 Setting up Python Flask backend..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python -m venv flask_env

# Activate virtual environment (Windows)
echo "🔧 To activate the virtual environment, run:"
echo "   flask_env\\Scripts\\activate"
echo ""
echo "📚 To install dependencies after activation, run:"
echo "   pip install -r requirements.txt"
echo ""
echo "🚀 To run the Flask server, run:"
echo "   python app.py"
echo ""
echo "✅ Setup complete! Follow the instructions above to get started."