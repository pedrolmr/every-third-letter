-- CREATE DATABASE words

CREATE TABLE word(
  word_id SERIAL PRIMARY KEY,
  string_to_cut VARCHAR(255),
  return_string VARCHAR(255)
);