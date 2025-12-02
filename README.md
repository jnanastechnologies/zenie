# Zenie — College Students & Teachers Web App

This repository contains a starter full-stack web application for college students and teachers.

Overview
- Backend: Node.js + Express + MongoDB (Mongoose) — authentication, role-based middleware, courses API.
- Frontend: React — login, dashboard, course listing, enroll/create course actions.

Quick start (local)
1. Install MongoDB and run it locally or set MONGO_URI to your MongoDB Atlas connection string.
2. Backend
   - cd backend
   - cp .env.example .env and update values
   - npm install
   - npm run dev
   - Server will start on PORT (default 4000)
3. Frontend
   - cd frontend
   - npm install
   - npm start
   - App runs at http://localhost:3000 (change FRONTEND_URL in .env if needed)

Features to add next
- Assignments (create/submit/grade)
- Announcements and notifications
- Rich profile pages and file uploads
- Pagination, validation, tests, and CI/CD
- Role management UI and admin panel