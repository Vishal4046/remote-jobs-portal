# 🚀 DEPLOYMENT COMPLETE - NEXT STEPS

Your Remote Jobs Portal is ready to deploy in **3 clicks**!

---

## **STEP 1: Deploy Backend (Railway) - Click Once**

**Link:** https://railway.app/new/github/Vishal4046/remote-jobs-portal

1. Go to the link above
2. Click **"Login with GitHub"** (authorize if needed)
3. Click **"Deploy"** button
4. Wait for green checkmark (2-3 minutes)
5. **IMPORTANT**: Go to **Variables** tab and paste:

```
MONGO_URI=mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true&w=majority
JWT_SECRET=remote_jobs_portal_secret_key_2026
PORT=5000
```

6. Click **Deploy** again
7. Your Railway URL appears at the top (save it!)

**Example Railway URL**: `https://remote-jobs-portal-production.railway.app`

---

## **STEP 2: Deploy Frontend (Netlify) - Click Once**

**Link:** https://netlify.com/deploy/github

1. Go to the link above
2. Click **"Connect GitHub"** (authorize if needed)
3. Select **`remote-jobs-portal`** from the list
4. Site name: `remote-jobs-portal` (or any name)
5. Click **"Deploy Site"**
6. Wait for build to complete (2-3 minutes)

**Your Netlify URL** will appear like: `https://remote-jobs-portal-abc123.netlify.app`

---

## **STEP 3: Connect Backend to Frontend - Copy-Paste**

After both deploy successfully:

1. Go to your **Netlify Site Settings**
2. Go to **Build & deploy** → **Environment**
3. Click **"Edit variables"**
4. Add this variable:

```
Key: VITE_API_BASE_URL
Value: https://your-railway-url/api
```

(Replace `your-railway-url` with your actual Railway URL from Step 1)

5. Click **Save**
6. Go to **Deploys** → **Trigger deploy** → **Deploy site**

---

## **DONE! 🎉**

Your website is LIVE at: **`https://your-netlify-site.netlify.app`**

### **Test These Features:**
- ✅ Visit your Netlify URL
- ✅ Try **Register** (create account)
- ✅ Try **Login** (sign in)
- ✅ View **Jobs**
- ✅ Apply for a **Job**
- ✅ **Bookmark** jobs

---

## **Your Credentials (SAVE THESE)**

| Service | URL | Username | 
|---------|-----|----------|
| **GitHub Repo** | https://github.com/Vishal4046/remote-jobs-portal | Vishal4046 |
| **MongoDB Atlas** | https://cloud.mongodb.com | vishalpatil4046_db_user |
| **Railway** | https://railway.app | GitHub Login |
| **Netlify** | https://netlify.com | GitHub Login |

