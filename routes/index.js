var express = require('express');
var router = express.Router();
var database = require('../database');
var moment = require('moment');

router.get('/', function(req, res){
  if (!req.loggedIn){
    res.render('homepage');
    return;
  }

  Promise.all([
    req.getCurrentUser(),
    database.getAllItemsByUserId(req.session.userId)
  ])
    .then(results => {
      const currentUser = results[0]
      const todos = results[1]
      res.render('profile', {
        currentUser: currentUser,
        todos: todos,
        newTodo: {},
        humanizeDate: humanizeDate
      });
    })
    .catch(error => {
      res.render('error', {
        error: error
      })
    })
});

const humanizeDate = function(date){
  return moment(date).format('MMM Do YY');
}

router.get('/login', function(req, res){
  res.render('login', {
    error: 'Please Log In'
  })
})

router.get('/signup', function(req, res){
  res.render('signup', {
    email: ''
  })
})

router.post('/login', function(req, res){
  const email = req.body.email
  const password = req.body.password
  database.authenticateUser(email, password)
    .then(userId => {
      if (userId){
        req.session.userId = userId
        res.redirect('/')
      }else{
        res.render('login', {
          error: 'Email or Password Not Found'
        })
      }
    })
    .catch(error => {
      // console.log('error?', arguments)
      res.render('error', {
        error: error,
      })
    })
})

router.post('/signup', function(req, res) {
  const attributes = req.body.user
  const email = attributes.email
  const password = attributes.password
  const password_confirmation = attributes.password_confirmation
    if (password !== '' && password !== password_confirmation){
      res.render('signup', {
        error: 'Passwords Do Not Match',
        email: email,
        })
      } else {
        database.createUser(attributes)
          .then(user => {
            login(req, user.id)
            res.redirect('/')
          })
          .catch(error => {
            res.render('homepage', {
              error: error,
              email: email,
            })
          })
    }
})

router.post('/todos', function(req, res){
  var todo = req.body.todo
  todo.userId = req.session.userId
  database.createTodo(todo)
    .then(todo => {
      res.redirect('/')
    })
    .catch(error => {
      res.render('new_todo_form', {
        error: error,
        newTodo: todo,
      })
    })
})

router.get('/todos/:todoId/delete', function(req, res){
  database.deleteTodo(req.params.todoId)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      res.render('error', {
        error: error,
      })
    })
})

router.get('/todos/:todoId/complete', function(req, res){
  database.completeTodo(req.params.todoId)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      res.render('error', {
        error: error,
      })
    })
})

router.get('/todos/:todoId/uncomplete', function(req, res){
  database.uncompleteTodo(req.params.todoId)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      res.render('error', {
        error: error
      })
    })
})

router.get('/logout', function(req, res){
  req.session = null
  res.redirect('/')
})

module.exports = router;
