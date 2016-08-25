var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */


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
      });
    })
    .catch(error => {
      res.render('error', {
        error: error
      })
    })

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
//
// router.get('/todos', function(req, res){
//   database.getAllItemsByUserId(req.session.userId)
//     .then(todos => {
//       res.render('todos/index', {
//         todos: todos
//       })
//     })
//     .catch(error => {
//       res.render('error', {
//         error: error
//       })
//     })
// })

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

// router.delete("/todos/"+todo.id, function(req, res){
//   todo.remove({
//     id: req.params.todo_id
//   }, function (err, todo) {
//     if(err)
//      res.send(err)
//   }
//   })
// })

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
        error: error.toString(),
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
        error: error.toString(),
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
        error: error.toString(),
      })
    })
})


// need a post for update


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
