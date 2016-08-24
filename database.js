'use strict';
const databaseName = process.env.NODE_ENV === 'tern_to_do_list'
const pgp = require('pg-promise')();
const connectionString = `postgres://${process.env.USER}@localhost:5432/tern_to_do_list`
const db = pgp(connectionString);

const getUserById = function(userId){
  return db.one("select * from users where users.id=$1", [userId])
}

// const getAllToDoListItems = function(id){
//   return db.any("select * from todo_list_items");
// }

const createUser = function(attributes) {
  const sql =  `
    INSERT INTO
      users (email, encrypted_password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `
  const variables = [
    attributes.email,
    attributes.password,
  ]
  return db.oneOrNone(sql, variables)
}

const createTodo = function(attributes) {
  const sql =  `
    INSERT INTO
      todo_list_items (user_id, description, note, rank, due_date)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      *
    `
  const variables = [
    attributes.userId,
    attributes.description,
    attributes.note,
    attributes.rank,
    attributes.due_date,
  ]
  return db.one(sql, variables)
}

const authenticateUser = function(email, password){
  const sql = `
    SELECT
      id
    FROM
      users
    WHERE
      email=$1
    AND
      encrypted_password=$2
    LIMIT
      1
  `
  return db.oneOrNone(sql, [email, password])
    .then(user => user ? user.id : null )
}

module.exports = {
  pgp: pgp,
  db: db,
  authenticateUser: authenticateUser,
  createUser: createUser,
  getUserById: getUserById,
  createTodo: createTodo,
};
