@echo off
REM ============================================================
REM REMOTE JOBS PORTAL - COMPLETE AUTOMATED DEPLOYMENT
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Remote Jobs Portal - Full Auto Deploy
echo ==========================================
echo.

REM Check Node.js
echo [1/5] Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not installed
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Install backend dependencies
echo.
echo [2/5] Installing dependencies...
echo Installing backend...
cd backend
call npm install >nul 2>&1
if errorlevel 1 (
    call npm install --legacy-peer-deps
)
cd ..
echo Installing frontend...
cd frontend
call npm install >nul 2>&1
if errorlevel 1 (
    call npm install --legacy-peer-deps
)
cd ..
echo ✓ Dependencies installed

REM Create environment files
echo.
echo [3/5] Setting up environment variables...
(
echo PORT=5000
echo MONGO_URI=mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true^&w=majority
echo JWT_SECRET=remote_jobs_portal_secret_key_2026
echo NODE_ENV=production
) > backend\.env
echo ✓ Backend .env created

(
echo VITE_API_BASE_URL=http://localhost:5000/api
) > frontend\.env.local
echo ✓ Frontend .env.local created

REM Build frontend
echo.
echo [4/5] Building frontend...
cd frontend
call npm run build >nul 2>&1
cd ..
echo ✓ Frontend built

REM Summary
echo.
echo [5/5] Deployment Summary
echo.
echo ========================================
echo ✅ ALL SETUP COMPLETE!
echo ========================================
echo.
echo 🔗 DEPLOYMENT LINKS:
echo.
echo Railway (Backend):
echo https://railway.app/new/github/Vishal4046/remote-jobs-portal
echo.
echo Netlify (Frontend):
echo https://app.netlify.com/start/deploy?repository=https://github.com/Vishal4046/remote-jobs-portal
echo.
echo ========================================
echo.
echo 📝 QUICK STEPS:
echo.
echo 1. Open Railway link in browser
echo 2. Login with GitHub
echo 3. Click Deploy
echo 4. Add Variables:
echo    MONGO_URI=mongodb+srv://vishalpatil4046_db_user:Vishal@1209@cluster0.9sqfb6h.mongodb.net/remote-jobs-portal?retryWrites=true^&w=majority
echo    JWT_SECRET=remote_jobs_portal_secret_key_2026
echo    PORT=5000
echo 5. Save Railway URL
echo.
echo 6. Open Netlify link in browser
echo 7. Login with GitHub
echo 8. Click Deploy Site
echo 9. Add: VITE_API_BASE_URL=YOUR-RAILWAY-URL/api
echo 10. ✅ DONE! Website is LIVE!
echo.
echo ========================================
echo.
pause
