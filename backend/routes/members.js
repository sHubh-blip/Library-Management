const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/members - Add a new member
// SQL: INSERT INTO Members (first_name, last_name, email, join_date)
//      VALUES (?, ?, ?, CURDATE());
router.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql =
    'INSERT INTO Members (first_name, last_name, email, join_date) VALUES (?, ?, ?, CURDATE())';

  try {
    const [result] = await db.execute(sql, [first_name, last_name, email]);
    res.status(201).json({ member_id: result.insertId, first_name, last_name, email });
  } catch (err) {
    console.error('Error creating member:', err);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

// GET /api/members - Get list of all members
// SQL: SELECT member_id, first_name, last_name, email, join_date
//      FROM Members ORDER BY join_date DESC;
router.get('/', async (req, res) => {
  const sql =
    'SELECT member_id, first_name, last_name, email, join_date FROM Members ORDER BY join_date DESC';

  try {
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// GET /api/members/:id/history - Get a member's loan history
// SQL:
//   SELECT l.loan_id, l.book_id, b.title, l.checkout_date, l.due_date, l.return_date
//   FROM Loans l
//   JOIN Books b ON l.book_id = b.book_id
//   WHERE l.member_id = ?
//   ORDER BY l.checkout_date DESC;
router.get('/:id/history', async (req, res) => {
  const memberId = req.params.id;
  const sql = `
    SELECT
      l.loan_id,
      l.book_id,
      b.title,
      l.checkout_date,
      l.due_date,
      l.return_date
    FROM Loans l
    JOIN Books b ON l.book_id = b.book_id
    WHERE l.member_id = ?
    ORDER BY l.checkout_date DESC
  `;

  try {
    const [rows] = await db.execute(sql, [memberId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching member history:', err);
    res.status(500).json({ error: 'Failed to fetch member history' });
  }
});

module.exports = router;
