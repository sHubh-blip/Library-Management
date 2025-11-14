import React, { useEffect, useState } from 'react';
import { FiUserPlus, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/client';
import StyledInput from '../components/StyledInput';
import StyledTable from '../components/StyledTable';

function Members() {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const loadMembers = async () => {
    setLoadingMembers(true);
    try {
      const res = await api.get('/members');
      setMembers(res.data);
    } catch (err) {
      console.error('Failed to load members from API, using demo data.', err);
      // Fallback demo members
      setMembers([
        {
          member_id: 1,
          first_name: 'Alice',
          last_name: 'Johnson',
          email: 'alice@example.com',
          join_date: '2024-01-10',
        },
        {
          member_id: 2,
          first_name: 'Bob',
          last_name: 'Smith',
          email: 'bob@example.com',
          join_date: '2024-02-05',
        },
      ]);
      toast((t) => (
        <span className="text-xs">Showing demo member data (backend not responding).</span>
      ), { id: 'demo-members', duration: 2500 });
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/members', form);
      toast.success('Member added successfully!');
      setForm({ first_name: '', last_name: '', email: '' });
      loadMembers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add member.');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (row) => (
        <span className="font-medium text-slate-900">
          {row.first_name} {row.last_name}
        </span>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'join_date', header: 'Joined On' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Members</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your library members and add new ones quickly.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50">
              <FiUserPlus className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Add New Member</h2>
              <p className="text-xs text-slate-500">
                Fill in the details below and submit to create a member.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <StyledInput
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
            <StyledInput
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
            <StyledInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow-md transition"
              >
                {submitting ? (
                  <>
                    <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Add Member'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Current Members</h2>
          {loadingMembers ? (
            <div className="h-40 rounded-xl bg-white border border-slate-100 shadow-sm animate-pulse" />
          ) : (
            <StyledTable
              columns={columns}
              data={members}
              getRowKey={(row) => row.member_id}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Members;
