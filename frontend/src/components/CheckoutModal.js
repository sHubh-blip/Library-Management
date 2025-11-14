import React, { useEffect, useState } from 'react';
import { FiX, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/client';

function CheckoutModal({ isOpen, book, onClose, onSuccess }) {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchMembers = async () => {
      setLoadingMembers(true);
      try {
        const res = await api.get('/members');
        setMembers(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load members.');
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMemberId || !book) return;

    setSubmitting(true);
    try {
      await api.post('/loans/checkout', {
        member_id: Number(selectedMemberId),
        book_id: book.book_id,
      });
      toast.success('Book checked out successfully!');
      setSelectedMemberId('');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to checkout book.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-100">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Checkout Book</h2>
            <p className="text-xs text-slate-500">“{book.title}”</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 transition"
          >
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div className="space-y-1 text-sm">
            <label className="text-slate-700 font-medium">Select Member</label>
            <div className="relative">
              <select
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                disabled={loadingMembers}
                required
              >
                <option value="">{loadingMembers ? 'Loading members…' : 'Choose a member'}</option>
                {members.map((m) => (
                  <option key={m.member_id} value={m.member_id}>
                    {m.first_name} {m.last_name} ({m.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || loadingMembers}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow-md transition"
            >
              {submitting ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Processing…
                </>
              ) : (
                'Confirm Checkout'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
