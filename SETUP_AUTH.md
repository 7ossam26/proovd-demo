# Proovd - Authentication Setup Guide

## Prerequisites

You need to have the Vercel CLI installed:
```bash
npm i -g vercel
```

## Step 1: Link Project to Vercel

```bash
vercel link
```

Follow the prompts to link your project to Vercel.

## Step 2: Add Vercel Postgres

1. Go to your project dashboard on Vercel
2. Click on the "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Click "Continue"
6. Choose a database name (e.g., "proovd-db")
7. Select a region close to your users
8. Click "Create"

## Step 3: Pull Environment Variables

After creating the database, pull the environment variables:

```bash
vercel env pull .env.local
```

This will create a `.env.local` file with your database credentials.

## Step 4: Initialize Database Schema

You can initialize the database schema in two ways:

### Option A: Using Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Click on "Storage" tab
3. Click on your Postgres database
4. Click on "Query" tab
5. Copy and paste the contents of `init-db.sql`
6. Click "Run Query"

### Option B: Using psql (if you have PostgreSQL client)

```bash
# Get the POSTGRES_URL from .env.local
psql "your-postgres-url-here" -f init-db.sql
```

## Step 5: Start Development Server

```bash
npm run dev
```

Your application should now be running at http://localhost:3000

## Step 6: Test Authentication

The authentication system is ready to use! The API endpoints are:

- POST `/api/auth/signup` - Create a new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user (requires token)

## Environment Variables

Make sure your `.env.local` file has these variables:

```env
# Database (automatically added by Vercel)
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."

# Auth (add these manually)
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

## Deployment

To deploy to Vercel:

```bash
vercel --prod
```

The database and environment variables will automatically be available in production.

## Troubleshooting

### Database Connection Error

If you get a database connection error, make sure:
1. You've run the `vercel env pull` command
2. Your `.env.local` file exists and has the correct database URL
3. You've initialized the database schema using `init-db.sql`

### JWT Secret Warning

In development, a default JWT secret is used. For production, make sure to:
1. Generate a secure random string
2. Add it to your Vercel environment variables as `JWT_SECRET`

## Next Steps

Now you can integrate the authentication with your frontend components!
