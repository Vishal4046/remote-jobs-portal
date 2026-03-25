# Quick Deployment Guide - Remote Jobs Portal

Your MongoDB is already configured! Now just deploy to Railway & Netlify.

## **STEP 1: Deploy Backend to Railway (5 minutes)**

### Sign up / Login to Railway
- Go to: https://railway.app/
- Click "Login with GitHub" 
- Authorize Railway to access your GitHub

### Create New Project
1. Click **"New Project"**
2. Click **"Deploy from GitHub Repo"**
3. Find and select: **`remote-jobs-portal`**
4. Click **"Deploy Now"**

### Add Environment Variables
After deployment starts:
1. Click on the **"backend"** service
2. Go to **"Variables"** tab
3. Add these variables:
   ```
   MONGO_URI = mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority
   JWT_SECRET = remote_jobs_portal_secret_key_2026
   PORT = 5000
   ```
4. Click **"Deploy"**

### Get Your Backend URL
- Wait for deployment (2-3 minutes - watch the logs)
- Once done, you'll see a URL like: `https://remote-jobs-portal-production.railway.app`
- **Copy this URL** - you'll need it for Netlify!

---

## **STEP 2: Deploy Frontend to Netlify (5 minutes)**

### Sign up / Login to Netlify
- Go to: https://netlify.com/
- Click "Sign up"
- Choose "Sign up with GitHub"
- Authorize Netlify

### Import Your Repository
1. Click **"Add new site"**
2. Click **"Import an existing project"**
3. Select **"GitHub"**
4. Find and select: **`remote-jobs-portal`**
5. Click **"Connect GitHub"**

### Configure Build Settings
Before clicking deploy, make sure:
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

Click **"Deploy"** and wait (2-3 minutes)

### Add Environment Variable
1. Go to **"Site settings"**
2. Click **"Build & deploy"** → **"Environment"**
3. Click **"Edit variables"**
4. Add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://YOUR-RAILWAY-URL/api`
   - (Replace with your actual Railway URL from Step 1)
5. Click **"Save"**
6. Go back, click **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**

---

## **STEP 3: Your Website is Live! 🎉**

- **Frontend URL**: `https://your-site-name.netlify.app`
- **Backend URL**: Your Railway URL

Test it by going to the Netlify URL!

---

## **Troubleshooting**

| Issue | Solution |
|-------|----------|
| Railway build fails | Check "View logs" tab for errors |
| Netlify build fails | Make sure `VITE_API_BASE_URL` is set correctly |
| API not connecting | Clear browser cache, reload the page |
| Login/Signup not working | Check Network tab in DevTools (F12) |

---

## **Your Credentials (Keep Safe!)**

- **GitHub**: https://github.com/Vishal4046/remote-jobs-portal
- **MongoDB**: vishalpatil4046_db_user (password saved)
- **Backend DB**: Connected via Railway
- **Frontend**: Hosted on Netlify

