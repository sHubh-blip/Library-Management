# Library Management System

Full-stack Library Management System showcasing advanced SQL, a Node.js/Express backend, and a modern React + Tailwind CSS frontend.

## Tech Stack

- **Backend:** Node.js, Express.js, MySQL (via `mysql2`)
- **Frontend:** React, React Router, Tailwind CSS v3, `react-hot-toast`, `react-icons`
- **Database:** MySQL with a normalized schema (Members, Authors, Books, Book_Authors, Loans)

## Features

- Manage members and books
- Many-to-many relationship between books and authors
- Loan management (checkout/return)
- Advanced SQL reports:
  - Available books (taking into account active loans)
  - Overdue loans
  - Popular books (top borrowed)
  - Member loan history
- Modern UI:
  - Sidebar layout (Dashboard, Browse Books, Members, Reports)
  - Responsive book grid with cards
  - Skeleton loaders & toasts for micro-interactions

---

## Project Structure

```text
library database/
  backend/
    schema.sql       # MySQL schema
    seed.sql         # Sample data
    server.js        # Express server
    db.js            # MySQL connection pool
    routes/          # API routes (members, books, loans, reports)
    package.json

  frontend/
    src/
      api/
      components/
      pages/
      App.js
      index.js
      index.css
    tailwind.config.js
    postcss.config.js
    package.json
```

---

## Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create and seed the MySQL database (adjust user/password as needed):

   ```sql
   -- In MySQL CLI
   SOURCE schema.sql;
   SOURCE seed.sql;
   ```

3. Configure DB credentials if needed (`db.js` or env vars `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

4. Start the backend API:

   ```bash
   npm run dev
   ```

The API will run on `http://localhost:4000`.

---

## Frontend Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Tailwind CSS v3 and PostCSS are already configured via `tailwind.config.js` and `postcss.config.js`.

3. Start the React app:

   ```bash
   npm start
   ```

The app will run on `http://localhost:3000` and proxy `/api/*` calls to `http://localhost:4000`.

> **Note:** If the backend is not reachable, the frontend falls back to demo data so that the UI still looks populated.

---

## Scripts

### Backend

- `npm run dev` – start API with `nodemon`
- `npm start` – start API with plain Node

### Frontend

- `npm start` – run React dev server
- `npm run build` – production build

---

## License

MIT
