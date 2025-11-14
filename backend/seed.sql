USE library_db;

-- Clear existing data for a clean seed (optional for dev)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Book_Authors;
TRUNCATE TABLE Loans;
TRUNCATE TABLE Books;
TRUNCATE TABLE Authors;
TRUNCATE TABLE Members;
SET FOREIGN_KEY_CHECKS = 1;

-- Seed Members
INSERT INTO Members (first_name, last_name, email, join_date) VALUES
('Alice', 'Johnson', 'alice@example.com', '2024-01-10'),
('Bob', 'Smith', 'bob@example.com', '2024-02-05'),
('Carol', 'Davis', 'carol@example.com', '2024-03-15');

-- Seed Authors
INSERT INTO Authors (first_name, last_name) VALUES
('George', 'Orwell'),
('Harper', 'Lee'),
('J.K.', 'Rowling'),
('F. Scott', 'Fitzgerald'),
('J.R.R.', 'Tolkien');

-- Seed Books
INSERT INTO Books (title, isbn, published_year, total_copies) VALUES
('1984', '9780451524935', 1949, 3),
('To Kill a Mockingbird', '9780061120084', 1960, 2),
('Harry Potter and the Philosopher''s Stone', '9780747532699', 1997, 5),
('The Great Gatsby', '9780743273565', 1925, 2),
('The Hobbit', '9780547928227', 1937, 4);

-- Link Books to Authors (Book_Authors)
-- Assume auto-increment IDs assigned in order as inserted above:
-- Books: 1=1984, 2=Mockingbird, 3=HP1, 4=Gatsby, 5=Hobbit
-- Authors: 1=Orwell, 2=Lee, 3=Rowling, 4=Fitzgerald, 5=Tolkien
INSERT INTO Book_Authors (book_id, author_id) VALUES
(1, 1), -- 1984 - Orwell
(2, 2), -- To Kill a Mockingbird - Lee
(3, 3), -- HP1 - Rowling
(4, 4), -- Gatsby - Fitzgerald
(5, 5); -- Hobbit - Tolkien

-- Seed Loans (some open, some returned, some overdue)
-- Alice borrows 1984 (open)
INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date) VALUES
(1, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 3 DAY), INTERVAL 14 DAY), NULL);

-- Bob borrows Mockingbird and returned it
INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date) VALUES
(2, 2, DATE_SUB(CURDATE(), INTERVAL 30 DAY), DATE_SUB(CURDATE(), INTERVAL 16 DAY), DATE_SUB(CURDATE(), INTERVAL 15 DAY));

-- Carol borrows HP1 (overdue)
INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date) VALUES
(3, 3, DATE_SUB(CURDATE(), INTERVAL 25 DAY), DATE_SUB(CURDATE(), INTERVAL 11 DAY), NULL);

-- Bob borrows The Hobbit (still open)
INSERT INTO Loans (book_id, member_id, checkout_date, due_date, return_date) VALUES
(5, 2, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 5 DAY), INTERVAL 14 DAY), NULL);
