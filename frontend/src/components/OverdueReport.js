import React, { useEffect, useState } from 'react';

function OverdueReport() {
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports/overdue')
      .then((res) => res.json())
      .then((data) => {
        setOverdue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching overdue report:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading overdue report...</div>;

  return (
    <div>
      <h2>Overdue Loans</h2>
      {overdue.length === 0 ? (
        <p>No overdue loans.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Book</th>
              <th>Member</th>
              <th>Checkout Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((row) => (
              <tr key={row.loan_id}>
                <td>{row.loan_id}</td>
                <td>{row.book_title}</td>
                <td>{row.member_name}</td>
                <td>{row.checkout_date}</td>
                <td>{row.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OverdueReport;
