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
          currentUser: user
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
  // res.json(req.body)
  //   return
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
        }).catch(error => {
          res.render('homepage', {
            error: error,
            email: email,
          })
        })
    }
})

router.get('/logout', function(req, res){
  req.session = null
  res.redirect('/')
})

module.exports = router;
