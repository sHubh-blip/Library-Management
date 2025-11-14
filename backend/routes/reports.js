const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/reports/overdue - Get all overdue loans
// SQL:
//   SELECT l.loan_id, l.book_id, b.title, l.member_id, CONCAT(m.first_name, ' ', m.last_name) AS member_name,
//          l.checkout_date, l.due_date
//   FROM Loans l
//   JOIN Books b ON l.book_id = b.book_id
//   JOIN Members m ON l.member_id = m.member_id
//   WHERE l.return_date IS NULL AND l.due_date < CURDATE();
router.get('/overdue', async (req, res) => {
  const sql = `
    SELECT
      l.loan_id,
      l.book_id,
      b.title AS book_title,
      l.member_id,
      CONCAT(m.first_name, ' ', m.last_name) AS member_name,
      l.checkout_date,
      l.due_date
    FROM Loans l
    JOIN Books b ON l.book_id = b.book_id
    JOIN Members m ON l.member_id = m.member_id
    WHERE l.return_date IS NULL
      AND l.due_date < CURDATE()
    ORDER BY l.due_date ASC
  `;

  try {
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching overdue report:', err);
    res.status(500).json({ error: 'Failed to fetch overdue report' });
  }
});

// GET /api/reports/popular - Get top 5 most-borrowed books
// SQL:
//   SELECT b.book_id, b.title, COUNT(l.book_id) AS borrow_count
//   FROM Loans l
//   JOIN Books b ON l.book_id = b.book_id
//   GROUP BY b.book_id, b.title
//   ORDER BY borrow_count DESC
//   LIMIT 5;
router.get('/popular', async (req, res) => {
  const sql = `
    SELECT
      b.book_id,
      b.title,
      COUNT(l.book_id) AS borrow_count
    FROM Loans l
    JOIN Books b ON l.book_id = b.book_id
    GROUP BY b.book_id, b.title
    ORDER BY borrow_count DESC
    LIMIT 5
  `;

  try {
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching popular report:', err);
    res.status(500).json({ error: 'Failed to fetch popular report' });
  }
});

module.exports = router;
