# Backend – Library Management System

Express.js + MySQL backend for the Library Management System.

## Tech

- Node.js + Express
- MySQL (via `mysql2/promise`)
- CORS enabled

## Structure

- `server.js` – sets up Express app and mounts routes
- `db.js` – MySQL connection pool
- `routes/`:
  - `members.js`
  - `books.js`
  - `loans.js`
  - `reports.js`
- `schema.sql` – database schema
- `seed.sql` – demo data

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create and seed the DB in MySQL:

   ```sql
   SOURCE schema.sql;
   SOURCE seed.sql;
   ```

3. Configure DB connection in `db.js` or via env vars:

   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME` (default: `library_db`)

4. Run the API:

   ```bash
   npm run dev
   ```

API base URL: `http://localhost:4000/api`

## Key Endpoints

- `GET /api/books` – books with authors and availability
- `GET /api/books/available` – only currently available books
- `GET /api/members` / `POST /api/members`
- `POST /api/loans/checkout` – checkout a book
- `PUT /api/loans/return/:loan_id` – return a book
- `GET /api/reports/overdue`
- `GET /api/reports/popular`
- `GET /api/members/:id/history`
