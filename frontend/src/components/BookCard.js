import React from 'react';
import { FiBookOpen, FiCheckCircle, FiXCircle } from 'react-icons/fi';

function BookCard({ book, onCheckoutClick }) {
  const available = (book.available_copies ?? 0) > 0;

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
        <FiBookOpen className="text-white text-4xl opacity-90 group-hover:scale-105 transition-transform" />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-slate-900 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-slate-500 mt-1">
          {book.authors || <span className="italic text-slate-400">Unknown author</span>}
        </p>
        <p className="text-xs text-slate-400 mt-1">ISBN: {book.isbn}</p>
        <div className="flex items-center justify-between mt-4">
          <span
            className={[
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
              available
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-rose-50 text-rose-700 border border-rose-100',
            ].join(' ')}
          >
            {available ? (
              <FiCheckCircle className="text-emerald-500" />
            ) : (
              <FiXCircle className="text-rose-500" />
            )}
            {available ? `Available (${book.available_copies})` : 'Checked Out'}
          </span>
          <button
            type="button"
            onClick={() => onCheckoutClick(book)}
            disabled={!available}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow-md transition-transform transition-shadow hover:-translate-y-0.5 disabled:bg-slate-300 disabled:shadow-none"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
