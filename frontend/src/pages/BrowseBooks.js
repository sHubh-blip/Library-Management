import React, { useEffect, useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/client';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import CheckoutModal from '../components/CheckoutModal';

function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to load books from API, using demo data.', err);
      // Fallback demo books so the grid is populated
      setBooks([
        {
          book_id: 1,
          title: '1984',
          authors: 'George Orwell',
          isbn: '9780451524935',
          published_year: 1949,
          total_copies: 3,
          available_copies: 1,
        },
        {
          book_id: 2,
          title: 'To Kill a Mockingbird',
          authors: 'Harper Lee',
          isbn: '9780061120084',
          published_year: 1960,
          total_copies: 2,
          available_copies: 0,
        },
        {
          book_id: 3,
          title: "Harry Potter and the Philosopher's Stone",
          authors: 'J.K. Rowling',
          isbn: '9780747532699',
          published_year: 1997,
          total_copies: 5,
          available_copies: 4,
        },
      ]);
      // Optionally show a subtle info toast instead of an error
      toast((t) => (
        <span className="text-xs">Showing demo book data (backend not responding).</span>
      ), { id: 'demo-books', duration: 2500 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => {
      const title = b.title?.toLowerCase() ?? '';
      const authors = b.authors?.toLowerCase() ?? '';
      const isbn = b.isbn?.toLowerCase() ?? '';
      return title.includes(q) || authors.includes(q) || isbn.includes(q);
    });
  }, [books, search]);

  const handleCheckoutClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCheckoutSuccess = () => {
    loadBooks();
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Browse Books</h1>
          <p className="mt-1 text-sm text-slate-500">
            Search and explore all books in your library.
          </p>
        </div>
        <div className="w-full md:w-72">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search by title, author, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section>
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.book_id} book={book} onCheckoutClick={handleCheckoutClick} />
            ))}
            {!filteredBooks.length && (
              <div className="col-span-full text-center text-sm text-slate-500 py-10">
                No books found matching “{search}”.
              </div>
            )}
          </div>
        )}
      </section>

      <CheckoutModal
        isOpen={isModalOpen}
        book={selectedBook}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}

export default BrowseBooks;
