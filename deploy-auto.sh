#!/bin/bash

#####################################################
# REMOTE JOBS PORTAL - COMPLETE AUTOMATED DEPLOYMENT
#####################################################

set -e

echo "=========================================="
echo "🚀 Remote Jobs Portal - Full Auto Deploy"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify Node.js and npm
echo -e "${BLUE}[1/5] Verifying Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Step 2: Install dependencies
echo ""
echo -e "${BLUE}[2/5] Installing dependencies...${NC}"
echo "Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps > /dev/null 2>&1 || npm install > /dev/null 2>&1
cd ..
echo "Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps > /dev/null 2>&1 || npm install > /dev/null 2>&1
cd ..
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Create .env files
echo ""
echo -e "${BLUE}[3/5] Setting up environment variables...${NC}"

# Backend .env
cat > backend/.env << 'EOF'
PORT=5000
MONGO_URI=mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority
JWT_SECRET=remote_jobs_portal_secret_key_2026
NODE_ENV=production
EOF
echo -e "${GREEN}✓ Backend .env created${NC}"

# Frontend .env.local
cat > frontend/.env.local << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api
EOF
echo -e "${GREEN}✓ Frontend .env.local created${NC}"

# Step 4: Build frontend
echo ""
echo -e "${BLUE}[4/5] Building frontend...${NC}"
cd frontend
npm run build > /dev/null 2>&1
cd ..
echo -e "${GREEN}✓ Frontend built successfully${NC}"

# Step 5: Summary
echo ""
echo -e "${BLUE}[5/5] Deployment summary${NC}"
echo ""
echo -e "${GREEN}✅ ALL SETUP COMPLETE!${NC}"
echo ""
echo "=========================================="
echo "📋 DEPLOYMENT LINKS"
echo "=========================================="
echo ""
echo -e "${YELLOW}🔗 Railway (Backend):${NC}"
echo "https://railway.app/new/github/Vishal4046/remote-jobs-portal"
echo ""
echo -e "${YELLOW}🔗 Netlify (Frontend):${NC}"
echo "https://app.netlify.com/start/deploy?repository=https://github.com/Vishal4046/remote-jobs-portal"
echo ""
echo "=========================================="
echo ""
echo "📝 Next Steps:"
echo "1. Click Railway link above"
echo "2. Login with GitHub"
echo "3. Click Deploy button"
echo "4. Add Variables:"
echo "   - MONGO_URI: mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority"
echo "   - JWT_SECRET: remote_jobs_portal_secret_key_2026"
echo "   - PORT: 5000"
echo "5. Save your Railway URL"
echo ""
echo "6. Click Netlify link above"
echo "7. Login with GitHub"
echo "8. Click Deploy Site"
echo "9. Add environment variable:"
echo "   - VITE_API_BASE_URL: https://YOUR-RAILWAY-URL/api"
echo "10. Done! Your website is live!"
echo ""
echo "=========================================="
