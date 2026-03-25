# Remote Jobs Portal - Complete Setup Guide

## Quick Links for Deployment

### Railway (Backend)
https://railway.app/new/github/Vishal4046/remote-jobs-portal

After clicking the link:
1. Login with GitHub
2. Click "Deploy"
3. Add Variables tab > Add these:
   - MONGO_URI: mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority
   - JWT_SECRET: remote_jobs_portal_secret_key_2026
   - PORT: 5000
4. Click Deploy again
5. Copy your Railway URL (save it!)

### Netlify (Frontend)
https://app.netlify.com/start/deploy?repository=https://github.com/Vishal4046/remote-jobs-portal

After clicking the link:
1. Login with GitHub
2. Click "Deploy Site"
3. Wait for build (2-3 min)
4. Site settings > Build & deploy > Environment
5. Add Variable:
   - VITE_API_BASE_URL: https://YOUR-RAILWAY-URL/api
6. Trigger deploy

## Local Development

### Backend
```
cd backend
npm install
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## Features
- User Registration & Login
- Job Listings
- Job Applications
- Bookmark Jobs
- JWT Authentication
- MongoDB Database

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Deployment: Railway + Netlify
