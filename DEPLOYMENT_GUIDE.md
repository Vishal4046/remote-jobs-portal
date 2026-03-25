# Remote Jobs Portal - Deployment Guide

## Step 1: Install Git
1. Go to https://git-scm.com/download/win
2. Download and install (just click Next → Next → Install)
3. After installation, close and reopen your terminal

## Step 2: Create GitHub Account & Repository
1. Go to https://github.com (if you don't have an account, sign up)
2. Click **+** (top right) → **New repository**
3. Name it: `remote-jobs-portal`
4. Click **Create repository**
5. **Copy the URL** shown (looks like: `https://github.com/YOUR-USERNAME/remote-jobs-portal.git`)

## Step 3: Push Code to GitHub
1. Open PowerShell in the project folder
2. Run these commands ONE BY ONE:

```
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git init
git add .
git commit -m "Initial commit"
git remote add origin PASTE-YOUR-GITHUB-URL-HERE
git branch -M main
git push -u origin main
```

3. It will ask for your GitHub username and password (use Personal Access Token if 2FA enabled)

## Step 4: Set up MongoDB
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Click **Create a Project**
4. Click **Create a Cluster** (choose FREE tier)
5. Add a database user (username/password)
6. Click **Network Access** → **Add Current IP Address**
7. Click **Databases** and copy the **CONNECTION STRING**
8. Replace `<password>` with your database password
9. Save this connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/remote-jobs-portal`)

## Step 5: Deploy Backend to Railway
1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub Repo**
3. Select your `remote-jobs-portal` repository
4. Railway will auto-detect it's a Node.js project
5. Click the project, go to **Variables** tab
6. Add these environment variables:
   - `MONGO_URI` = Your MongoDB connection string from Step 4
   - `JWT_SECRET` = Generate a random string (e.g., `your-super-secret-key-12345`)
   - `PORT` = `5000`
7. **Copy your Railway deployment URL** (looks like: `https://remote-jobs-portal-production.railway.app`)

## Step 6: Deploy Frontend to Netlify
1. Go to https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Select GitHub, choose `remote-jobs-portal` repository
4. Build settings (already auto-filled):
   - **Build command:** `cd frontend && npm install && npm run build`
   - **Publish directory:** `frontend/dist`
5. Click **Deploy**
6. Wait for build to complete (2-3 minutes)
7. Go to **Site settings** → **Build & deploy** → **Environment**
8. Add this variable:
   - `VITE_API_BASE_URL` = Your Railway URL from Step 5 + `/api`
   - Example: `https://remote-jobs-portal-production.railway.app/api`
9. Trigger a redeploy (it will rebuild automatically with new env variable)

## Step 7: Your Live Website!
- Frontend URL: `https://your-site-name.netlify.app`
- Backend URL: Your Railway URL
- Both are now live! 🎉

## Troubleshooting

**If Railway build fails:**
- Make sure backend/.env.example exists
- Railway should have all env variables set

**If Netlify build fails:**
- Make sure frontend/.env.example exists
- Check Build logs in Netlify dashboard

**API not connecting:**
- Make sure `VITE_API_BASE_URL` in Netlify = Railway URL + `/api`
- Clear browser cache and reload
