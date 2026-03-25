@echo off
REM Automated deployment script for Remote Jobs Portal

echo ===================================
echo Remote Jobs Portal - Auto Deploy
echo ===================================
echo.

REM Configure git user
echo [Step 1/4] Configuring Git...
git config --global user.name "Vishal Patil"
git config --global user.email "vishal4046@gmail.com"

REM Add all files
echo [Step 2/4] Adding files to Git...
git add .

REM Commit changes
echo [Step 3/4] Committing changes...
git commit -m "Deployment: Add Railway and Netlify configuration with MongoDB setup"

REM Push to GitHub
echo [Step 4/4] Pushing to GitHub...
git push origin main

echo.
echo ===================================
echo Deployment files pushed to GitHub!
echo Next steps:
echo 1. Go to https://railway.app
echo 2. Go to https://netlify.com
echo 3. Both will auto-detect your repository
echo ===================================
echo.
pause
