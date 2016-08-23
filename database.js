'use strict';

const pgp = require('pg-promise')();
const connectionString = `postgres://${process.env.USER}@localhost:5432/tern_to_do_list`
const db = pgp(connectionString);

const getUserById = function(userId){
  return db.one("select * from users where users.id=$1", [userId])
}

const getAllToDoListItems = function(id){
  return db.any("select * from todo_list_items");
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
  getUserById: getUserById,
  getAllToDoListItems: getAllToDoListItems,
};
