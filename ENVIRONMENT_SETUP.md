# Environment Variables Setup Guide

This guide will help you set up environment variables for secure production deployment.

## 🚨 IMPORTANT: Remove Sensitive Information

**BEFORE SETTING UP ENVIRONMENT VARIABLES**, you need to remove the hardcoded sensitive information from `supabase-config.js`.

### Step 1: Create Environment Variables File

Create a file called `.env.local` in your project root with the following content:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxcugztoedvvvfuzkkld.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VJSOyeL0X95TE1X84Cdwdw_JTV689aD
```

### Step 2: Install Dependencies

You need to install the `dotenv` package to read environment variables:

```bash
npm init -y
npm install dotenv
```

### Step 3: Build with Environment Variables

Run the build script to create a secure config file:

```bash
node build-with-env.js
```

This will:
- Read your environment variables from `.env.local`
- Create a new `supabase-config.js` with the variables injected
- Remove the hardcoded sensitive information

### Step 4: Security Checklist

✅ **Remove from version control:**
- Add `.env.local` to your `.gitignore` file
- Never commit `.env.local` to Git

✅ **For deployment platforms:**

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Netlify:**
- Go to Site Settings > Environment Variables
- Add both variables

**GitHub Pages:**
- Use GitHub Actions with secrets
- Set repository secrets in Settings > Secrets

### Step 5: Remove Debug Logging

For production, remove these console.log statements:

**Files to clean:**
- `supabase-config.js` - Remove the config logging
- `admin-auth.js` - Remove debug logging
- `script.js` - Remove featured items debugging

### Step 6: Test Production Build

1. Run the build script: `node build-with-env.js`
2. Test your admin panel login
3. Verify all functionality works
4. Check browser console for any errors

## 🔒 Security Notes

- **Anon Key**: The Supabase anon key is safe to use in frontend code (it's designed for client-side use)
- **Service Role Key**: Never expose this in frontend code (you're not using it, which is good)
- **Admin Authentication**: Your admin system is properly secured with Supabase Auth

## 📁 File Structure After Setup

```
project/
├── .env.local              # Your environment variables (DO NOT COMMIT)
├── .env.example            # Template for others (safe to commit)
├── supabase-config.js      # Built from env vars (safe to commit)
├── build-with-env.js       # Build script
└── ...other files
```

## 🚀 Deployment Commands

**Local Development:**
```bash
# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Build with environment variables
node build-with-env.js

# Test locally
python -m http.server 8000
# or use any static file server
```

**Production Deployment:**
```bash
# Build for production
node build-with-env.js

# Deploy the built files
# (Upload all files except .env.local)
```
