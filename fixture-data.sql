INSERT INTO
  users (email, encrypted_password)
VALUES
  ('bob@bob.com', '$2a$10$lw.oCS5va.B9G8LQuC6BuuOfjkJK5S8N4VskXMbaCB4Do/0Y9hPei')
;


INSERT INTO
  todo_list_items (user_id, description, note, due_date)
VALUES
  (1, 'eat a pidgen', 'flying rats', '1/1/2017'),
  (1, 'poke a duck', 'QUACK', '1/1/2017'),
  (1, 'laugh at phill', 'lol', '1/1/2017')
;
