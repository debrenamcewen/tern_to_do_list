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

module.exports = {
  pgp: pgp,
  db: db,
  getUserById: getUserById,
  getAllToDoListItems: getAllToDoListItems,
};
