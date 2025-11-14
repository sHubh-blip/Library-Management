const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/loans/checkout - Check out a book
// SQL:
//   INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date)
//   VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), NULL);
router.post('/checkout', async (req, res) => {
  const { book_id, member_id } = req.body;
  if (!book_id || !member_id) {
    return res.status(400).json({ error: 'Missing book_id or member_id' });
  }

  const sql = `
    INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date)
    VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), NULL)
  `;

  try {
    const [result] = await db.execute(sql, [book_id, member_id]);
    res.status(201).json({
      loan_id: result.insertId,
      book_id,
      member_id,
    });
  } catch (err) {
    console.error('Error checking out book:', err);
    res.status(500).json({ error: 'Failed to checkout book' });
  }
});

// PUT /api/loans/return/:loan_id - Return a book
// SQL:
//   UPDATE Loans
//   SET return_date = CURDATE()
//   WHERE loan_id = ? AND return_date IS NULL;
router.put('/return/:loan_id', async (req, res) => {
  const loanId = req.params.loan_id;

  const sql = `
    UPDATE Loans
    SET return_date = CURDATE()
    WHERE loan_id = ? AND return_date IS NULL
  `;

  try {
    const [result] = await db.execute(sql, [loanId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Loan not found or already returned' });
    }
    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    console.error('Error returning book:', err);
    res.status(500).json({ error: 'Failed to return book' });
  }
});

module.exports = router;
