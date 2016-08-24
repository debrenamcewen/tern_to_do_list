var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */


router.get('/', function(req, res){
  if (req.loggedIn){
    // database.getUserById(req.session.userId)
    req.getCurrentUser()
      .then(user => {
        res.render('profile', {
          currentUser: user,
          todo: { }
        });
      })
  }else{
    res.render('homepage');
  }
});

router.get('/login', function(req, res){
  res.render('login', {
    error: 'not here'
  })
})

router.get('/signup', function(req, res){
  res.render('signup', {
    email: ''
  })
})

router.get('/todos', function(req, res){
  res.render('homepage', {
    description: ''
  })
})

router.post('/login', function(req, res){
  const email = req.body.email
  const password = req.body.password
  database.authenticateUser(email, password).then(userId => {
    if (userId){
      req.session.userId = userId
      res.redirect('/')
    }else{
      res.render('login', {
        error: 'Email or Password Not Found :('
      })
    }
  })
})


router.post('/signup', function(req, res) {
  const attributes = req.body.user
  const email = attributes.email
  const password = attributes.password
  const password_confirmation = attributes.password_confirmation
    if (password !== '' && password !== password_confirmation){
      res.render('signup', {
        error: 'passwords do not match',
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
        error: error.toString(),
        todo: todo,
      })
    })
})

// router.post('/profile', function(req,res){
//   const attributes = req.body.user
//   const description = attributes.description
//   const note = attributes.note
//   const rank = attributes.rank
//   const due_date = attributes.due_date
//   if(description){
//     Promise.all([
//       database.getUserById(userId),
//       database.createToDo(attributes)
//     // ])
//       .then( results => {
//         login(req, user.id)
//           res.redirect('/')
//         }).catch(error => {
//           res.render('profile', {
//             error: error,
//             description: description
//         })
//


router.get('/logout', function(req, res){
  req.session = null
  res.redirect('/')
})

module.exports = router;
