import React, { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>Books</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>ISBN</th>
            <th>Published Year</th>
            <th>Total Copies</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.book_id}>
              <td>{b.title}</td>
              <td>{b.authors || 'Unknown'}</td>
              <td>{b.isbn}</td>
              <td>{b.published_year || '-'}</td>
              <td>{b.total_copies}</td>
              <td>{b.available_copies > 0 ? 'Available' : 'Checked Out'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
