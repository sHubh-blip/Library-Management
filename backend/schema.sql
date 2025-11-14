CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- Members table
CREATE TABLE IF NOT EXISTS Members (
    member_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    join_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (member_id)
) ENGINE=InnoDB;

-- Authors table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (author_id)
) ENGINE=InnoDB;

-- Books table
CREATE TABLE IF NOT EXISTS Books (
    book_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    published_year INT,
    total_copies INT NOT NULL DEFAULT 1,
    PRIMARY KEY (book_id)
) ENGINE=InnoDB;

-- Book_Authors junction table
CREATE TABLE IF NOT EXISTS Book_Authors (
    book_id INT UNSIGNED NOT NULL,
    author_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_book_authors_book
        FOREIGN KEY (book_id)
        REFERENCES Books (book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_book_authors_author
        FOREIGN KEY (author_id)
        REFERENCES Authors (author_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Loans table
CREATE TABLE IF NOT EXISTS Loans (
    loan_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    book_id INT UNSIGNED NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    checkout_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    PRIMARY KEY (loan_id),
    CONSTRAINT fk_loans_book
        FOREIGN KEY (book_id)
        REFERENCES Books (book_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_loans_member
        FOREIGN KEY (member_id)
        REFERENCES Members (member_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    INDEX idx_loans_member (member_id),
    INDEX idx_loans_book (book_id),
    INDEX idx_loans_due_return (due_date, return_date)
) ENGINE=InnoDB;
