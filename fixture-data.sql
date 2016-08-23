  //notesfromjared

  INSERT INTO
    users (email, encrypted_password)
  VALUES
    ('email@email.org', 'cheese'),
    ('email@email.org', 'cheese'),
    ('email@email.org', 'cheese')
  ;

  INSERT INTO
    todo_list_items (user_id, description, note, rank, due_date)
  VALUES
    (1, 'need to call my homies', 'do not forget', 1, '25-08-2016'),
    (2, 'need to call my grandma', 'do not forget', 3, '24-08-2016'),
    (2, 'need to call my love', 'do not forget', 2, '22-08-2016')
  ;
