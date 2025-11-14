const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/books - Add a new book and link authors
// Body: { title, isbn, published_year, total_copies, author_ids: [1,2] }
router.post('/', async (req, res) => {
  const { title, isbn, published_year, total_copies = 1, author_ids = [] } = req.body;
  if (!title || !isbn) {
    return res.status(400).json({ error: 'Missing required fields: title, isbn' });
  }

  const insertBookSql = `
    INSERT INTO Books (title, isbn, published_year, total_copies)
    VALUES (?, ?, ?, ?)
  `;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [bookResult] = await connection.execute(insertBookSql, [
      title,
      isbn,
      published_year || null,
      total_copies,
    ]);

    const bookId = bookResult.insertId;

    if (author_ids && author_ids.length > 0) {
      const insertBookAuthorsSql = `
        INSERT INTO Book_Authors (book_id, author_id)
        VALUES ${author_ids.map(() => '(?, ?)').join(', ')}
      `;
      const params = [];
      author_ids.forEach((authorId) => {
        params.push(bookId, authorId);
      });
      await connection.execute(insertBookAuthorsSql, params);
    }

    await connection.commit();
    res.status(201).json({ book_id: bookId, title, isbn, published_year, total_copies, author_ids });
  } catch (err) {
    await connection.rollback();
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'Failed to create book' });
  } finally {
    connection.release();
  }
});

// GET /api/books - Get all books with authors and availability
router.get('/', async (req, res) => {
  const sql = `
    SELECT
      b.book_id,
      b.title,
      b.isbn,
      b.published_year,
      b.total_copies,
      GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR ', ') AS authors,
      (b.total_copies - IFNULL(open_loans.open_count, 0)) AS available_copies
    FROM Books b
    LEFT JOIN Book_Authors ba ON b.book_id = ba.book_id
    LEFT JOIN Authors a ON ba.author_id = a.author_id
    LEFT JOIN (
      SELECT
        book_id,
        COUNT(*) AS open_count
      FROM Loans
      WHERE return_date IS NULL
      GROUP BY book_id
    ) AS open_loans ON b.book_id = open_loans.book_id
    GROUP BY b.book_id
    ORDER BY b.title ASC
  `;

  try {
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/available - Get only available books
router.get('/available', async (req, res) => {
  const sql = `
    SELECT
      b.book_id,
      b.title,
      b.isbn,
      b.total_copies,
      (b.total_copies - IFNULL(open_loans.open_count, 0)) AS available_copies
    FROM Books b
    LEFT JOIN (
      SELECT book_id, COUNT(*) AS open_count
      FROM Loans
      WHERE return_date IS NULL
      GROUP BY book_id
    ) AS open_loans ON b.book_id = open_loans.book_id
    WHERE b.total_copies > IFNULL(open_loans.open_count, 0)
    ORDER BY b.title ASC
  `;

  try {
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching available books:', err);
    res.status(500).json({ error: 'Failed to fetch available books' });
  }
});

module.exports = router;
