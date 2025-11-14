# Frontend – Library Management System

Modern React + Tailwind CSS UI for the Library Management System.

## Tech

- React (CRA-style setup)
- React Router
- Tailwind CSS v3
- Axios (API client)
- `react-hot-toast` (notifications)
- `react-icons` (icons)

## Layout & Pages

- **Sidebar** – navigation between:
  - Dashboard
  - Browse Books
  - Members
  - Reports
- **Dashboard** – stat cards + popular books table
- **Browse Books** – searchable, responsive book grid with cards & checkout modal
- **Members** – add member form + member list table
- **Reports** – overdue loans table

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Tailwind is configured via:

   - `tailwind.config.js`
   - `postcss.config.js`
   - `src/index.css`

3. Run the dev server:

   ```bash
   npm start
   ```

App runs at `http://localhost:3000`. The `proxy` in `package.json` forwards `/api/*` to `http://localhost:4000` where the backend should be running.

> If the backend is down, the UI falls back to demo data for books, members, stats and reports so you still get a complete visual demo.

## Scripts

- `npm start` – start dev server
- `npm run build` – production build

## Notes

- API client is configured in `src/api/client.js` (base URL: `/api`).
- Main layout and routing in `src/App.js`.
