const express = require('express');
const cors = require('cors');

const membersRoutes = require('./routes/members');
const booksRoutes = require('./routes/books');
const loansRoutes = require('./routes/loans');
const reportsRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/members', membersRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/reports', reportsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
