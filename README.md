# User Management Fullstack Application

## Overview
This project is a modern fullstack user management system built with React, TypeScript, Vite, Express, and Prisma (using SQLite). It features a clean UI, CRUD operations, and avatar image support, designed for easy local development and deployment.

---

## Components Breakdown

### Frontend (React + Vite)
- **App.tsx**: Main application entry point, sets up routing and layout.
- **pages/Users.tsx**: User management page. Displays user table, search, and side panel for add/edit/view. Handles all CRUD logic and UI state.
- **components/ui/**: Reusable UI components (Button, Card, Table, etc.) for consistent design.
- **components/app/Layout.tsx**: Main layout for dashboard and navigation.
- **lib/api.ts**: API utility for communicating with backend (get, add, update, delete users).
- **global.css**: Tailwind CSS for styling.

### Backend (Express + Prisma)
- **server/index.ts**: Main Express server, serves API routes and static files.
- **server/routes/users.ts**: REST API for user CRUD operations, connected to Prisma ORM.
- **prisma/schema.prisma**: Prisma schema defining the User model and SQLite datasource.
- **prisma/seed.ts**: Seed script to preload user data and avatars into the database.

### Shared
- **shared/api.ts**: Shared API types and utilities.
- **public/avatars/**: Folder for user avatar images.

---

## Why SQLite (Prisma) and Not MongoDB?
- **Simplicity**: SQLite is file-based, requires no server setup, and is perfect for local development and small/medium apps.
- **Prisma Integration**: Prisma's type safety, migrations, and developer experience are best-in-class with SQL databases.
- **Demo/Local Use**: For a demo or local app, SQLite is fast, zero-config, and cross-platform. MongoDB would require a running server and more setup.
- **Migration Ready**: Prisma makes it easy to switch to Postgres/MySQL for production if needed.

---

## How to Clone and Run This Application

### 1. Clone the Repository
```sh

cd project
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Download and Set Up the Database

This project uses **SQLite**, a lightweight, file-based database. You do NOT need to install or run a separate database server.

- Prisma will automatically create the SQLite database file (`prisma/dev.db`) when you run migrations.
- If you want to inspect or edit the database, you can download a free SQLite browser:
	- [DB Browser for SQLite](https://sqlitebrowser.org/dl/)
	- [SQLiteStudio](https://sqlitestudio.pl/)

**No manual database setup is required for development.**

#### Run Prisma migrations:
```sh
npx prisma migrate dev --name init
```
#### Seed the database with initial users and avatars:
```sh
npx ts-node prisma/seed.ts
```



### 4. Start Backend and Frontend (Open 2 Terminals)

#### Terminal 1: Start Backend
```sh
npm run server
```
- This runs the Express server on the backend (usually port 5000 or 3001).

#### Terminal 2: Start Frontend
```sh
npm run dev
```
- This runs the Vite development server for the React frontend (usually port 5173).

### 5. Access the App
- Open your browser and go to `http://localhost:5173` for the frontend.
- The backend API will be available at `/api/users`.

---

## Features
- User table with search, edit, add, and delete actions
- Side panel for editing/adding/viewing user details
- Avatar image upload and display
- Responsive, modern UI with Tailwind CSS
- Full CRUD operations with persistent database

---

## Troubleshooting
- If you see database errors, ensure migrations and seed scripts ran successfully.
- If avatars do not show, check filenames and placement in `public/avatars/`.
- For TypeScript errors, run `npm install` to ensure all types are present.

---

## Contribution & Customization
- Fork and clone the repo
- Add new features or UI improvements
- Switch to Postgres/MySQL for production by editing `prisma/schema.prisma` and running migrations

---

## License
MIT

---

**For any questions or issues, please open an issue in the repository.**
