CREATE TABLE IF NOT EXISTS books_reviews (
  id SERIAL PRIMARY KEY,
  book_name varchar(50) NOT NULL,
  book_review varchar(50) NOT NULL
);