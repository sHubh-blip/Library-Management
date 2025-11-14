import React, { useEffect, useState } from 'react';

function CheckoutForm() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error('Error fetching members:', err));

    fetch('/api/books/available')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching available books:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (!selectedMember || !selectedBook) {
      setMessage('Please select both a member and a book.');
      return;
    }

    fetch('/api/loans/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        member_id: Number(selectedMember),
        book_id: Number(selectedBook),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to checkout book');
        return res.json();
      })
      .then(() => {
        setMessage('Book checked out successfully.');
        return fetch('/api/books/available')
          .then((res) => res.json())
          .then((data) => setBooks(data));
      })
      .catch((err) => {
        console.error(err);
        setMessage('Error checking out book.');
      });
  };

  return (
    <div>
      <h2>Checkout Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Member:{' '}
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              required
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.member_id} value={m.member_id}>
                  {m.first_name} {m.last_name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Book:{' '}
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
            >
              <option value="">Select book</option>
              {books.map((b) => (
                <option key={b.book_id} value={b.book_id}>
                  {b.title} (Available: {b.available_copies})
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Checkout</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckoutForm;
