'use strict';
const bcrypt = require('bcrypt-nodejs')
const databaseName = process.env.NODE_ENV === 'tern_to_do_list'
const pgp = require('pg-promise')();
const connectionString = `postgres://${process.env.USER}@localhost:5432/tern_to_do_list`
const db = pgp(connectionString);

const getUserById = function(userId){
  return db.one("select * from users where users.id=$1", [userId])
}

const createUser = function(attributes) {
  const sql =  `
    INSERT INTO
      users (email, encrypted_password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `

  const encrypted_password = bcrypt.hashSync(attributes.password)
  const variables = [
    attributes.email,
    encrypted_password,
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

const getAllItemsByUserId = function(userId) {
  const sql =  `
    SELECT
      *
    FROM
      todo_list_items
    WHERE
      user_id=$1
    ORDER BY
      created_at ASC,
      id DESC
    `
  const variables = [userId]
  return db.manyOrNone(sql, variables)
}

const deleteTodo = function(todoId) {
  const sql =  `
    DELETE FROM
      todo_list_items
    WHERE
      id=$1
    `
  const variables = [todoId]
  return db.none(sql, variables)
}

const authenticateUser = function(email, password){
  const sql = `
    SELECT
      id, encrypted_password
    FROM
      users
    WHERE
      email=$1
    LIMIT
      1
  `
  return db.oneOrNone(sql, [email])
    .then(user => {
      return user && bcrypt.compareSync(password, user.encrypted_password) ?
        user.id : null;
    })
}

const completeTodo = function(todoId){
  const sql = `
    UPDATE
      todo_list_items
    SET
      completed=true
    WHERE
      id=$1
  `
  const variables = [todoId]
  return db.oneOrNone(sql, variables)
}

const uncompleteTodo = function(todoId){
  const sql = `
    UPDATE
      todo_list_items
    SET
      completed=false
    WHERE
      id=$1
  `
  const variables = [todoId]
  return db.oneOrNone(sql, variables)
}

module.exports = {
  pgp: pgp,
  db: db,
  deleteTodo: deleteTodo,
  authenticateUser: authenticateUser,
  createUser: createUser,
  getUserById: getUserById,
  createTodo: createTodo,
  getAllItemsByUserId: getAllItemsByUserId,
  uncompleteTodo: uncompleteTodo,
  completeTodo: completeTodo
};
