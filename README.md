# Acowale Assessment

A production-ready feedback management application built with React, TypeScript, Vite, Node.js, Express, Prisma, and PostgreSQL.

## Tech Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma
- Validation: Zod
- Testing: Vitest

## Features
- Feedback submission form
- Admin dashboard with analytics and filtering
- Health check endpoint
- Validation and error handling
- Responsive UI with toasts

## Setup
1. Install dependencies: `npm install`
2. Configure environment variables in `server/.env`
3. Run Prisma migration: `npm run prisma:migrate`
4. Start the app: `npm run dev`

## Environment Variables
```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/acowale
```

## API Endpoints
- POST `/api/feedback`
- GET `/api/feedback`
- GET `/api/feedback/analytics`
- GET `/api/health`

## Folder Structure
- `client/` - Vite React frontend
- `server/` - Express backend
- `server/prisma/` - Prisma schema and migrations

## Deployment
- Build: `npm run build`
- Test: `npm run test`
