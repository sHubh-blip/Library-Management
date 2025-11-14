import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/client';
import StyledTable from '../components/StyledTable';

function Reports() {
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOverdue = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reports/overdue');
      setOverdue(res.data);
    } catch (err) {
      console.error('Failed to load overdue report from API, using demo data.', err);
      // Fallback demo overdue loans
      setOverdue([
        {
          loan_id: 101,
          book_title: 'Harry Potter and the Philosopher\'s Stone',
          member_name: 'Carol Davis',
          checkout_date: '2024-03-01',
          due_date: '2024-03-15',
        },
      ]);
      toast((t) => (
        <span className="text-xs">Showing demo overdue data (backend not responding).</span>
      ), { id: 'demo-overdue', duration: 2500 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverdue();
  }, []);

  const columns = [
    { key: 'loan_id', header: 'Loan ID' },
    { key: 'book_title', header: 'Book' },
    { key: 'member_name', header: 'Member' },
    { key: 'checkout_date', header: 'Checkout Date' },
    { key: 'due_date', header: 'Due Date' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50">
          <FiAlertTriangle className="text-rose-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Overdue Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            View all books that are currently overdue.
          </p>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Currently Overdue</h2>
          <button
            type="button"
            onClick={loadOverdue}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
          >
            {loading && <FiLoader className="h-3.5 w-3.5 animate-spin" />}
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="h-40 rounded-xl bg-white border border-slate-100 shadow-sm animate-pulse" />
        ) : (
          <StyledTable
            columns={columns}
            data={overdue}
            getRowKey={(row) => row.loan_id}
          />
        )}
      </section>
    </div>
  );
}

export default Reports;
