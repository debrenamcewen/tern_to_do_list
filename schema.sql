CREATE TABLE users (
  id PRIMARY KEY
  email VARCHAR(255)
  encrypted_password VARCHAR(255)
);

CREATE TABLE todo_list_items (
  id PRIMARY KEY NOT NULL
  user_id INTEGER NOT NULL
  description VARCHAR(255) NOT NULL
  note TEXT
  rank INTEGER
  due_date DATE
);

SELECT
  *
FROM
  todo_list_items
WHERE
    user_id=$1
ORDER BY
  rank ASC


SELECT
  id
FROM
  users
WHERE
  users.id = user_id

INSERT INTO todo_list_items VALUES (
  id PRIMARY KEY NOT NULL
  user_id INTEGER NOT NULL
  description VARCHAR(255) NOT NULL
  note TEXT
  rank INTEGER
  due_date DATE
);
