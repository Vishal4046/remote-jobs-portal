#!/bin/bash
# Automated Deployment Script for Remote Jobs Portal
# This script deploys both backend and frontend

echo "=========================================="
echo "Remote Jobs Portal - Full Setup"
echo "=========================================="

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
  echo "Creating backend/.env..."
  cat > backend/.env << 'EOF'
PORT=5000
MONGO_URI=mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority
JWT_SECRET=remote_jobs_portal_secret_key_2026
EOF
  echo "✓ backend/.env created"
fi

# Check if .env exists in frontend
if [ ! -f "frontend/.env.local" ]; then
  echo "Creating frontend/.env.local..."
  cat > frontend/.env.local << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api
EOF
  echo "✓ frontend/.env.local created"
fi

echo ""
echo "=========================================="
echo "Installation Complete!"
echo "=========================================="
echo ""
echo "Backend is ready at: http://localhost:5000"
echo "Frontend is ready at: http://localhost:5173"
echo ""
echo "To deploy:"
echo "1. Railway: https://railway.app/new/github/Vishal4046/remote-jobs-portal"
echo "2. Netlify: https://app.netlify.com/start/deploy?repository=https://github.com/Vishal4046/remote-jobs-portal"
