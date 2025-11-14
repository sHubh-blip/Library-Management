import React, { useEffect, useState } from 'react';

function MemberPage() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' });
  const [message, setMessage] = useState('');

  const loadMembers = () => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error('Error fetching members:', err));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create member');
        return res.json();
      })
      .then(() => {
        setMessage('Member created successfully.');
        setForm({ first_name: '', last_name: '', email: '' });
        loadMembers();
      })
      .catch((err) => {
        console.error(err);
        setMessage('Error creating member.');
      });
  };

  return (
    <div>
      <h2>Members</h2>

      <h3>Add New Member</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:{' '}
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:{' '}
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:{' '}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Member</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Member List</h3>
      <ul>
        {members.map((m) => (
          <li key={m.member_id}>
            {m.first_name} {m.last_name} ({m.email}) – Joined: {m.join_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberPage;
