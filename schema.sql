DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  encrypted_password VARCHAR(255)
);

CREATE UNIQUE INDEX email ON users (email);

DROP TABLE IF EXISTS todo_list_items;

CREATE TABLE todo_list_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  note TEXT,
  rank INTEGER,
  due_date DATE NOT NULL
);

-- SELECT
--   *
-- FROM
--   todo_list_items
-- WHERE
--     user_id=$1
-- ORDER BY
--   rank ASC
-- ;
--
-- SELECT
--   id
-- FROM
--   users
-- WHERE
--   users.id = todo_list_items.user_id
-- ;

-- INSERT INTO todo_list_items VALUES (
--   id PRIMARY KEY NOT NULL
--   user_id INTEGER NOT NULL
--   description VARCHAR(255) NOT NULL
--   note TEXT
--   rank INTEGER
--   due_date DATE
-- );
