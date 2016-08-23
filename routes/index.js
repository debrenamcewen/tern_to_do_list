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

// module.exports = {
//   getUserById: function(userId){
//     const sql = `
//       SELECT
//         *
//       FROM
//         users
//       WHERE
//         id=$1
//       LIMIT
//         1
//     `
//     return db.oneOrNone(sql, user_id)
//   }
// }
// from jared


router.get('/login', function(req, res){
  res.render('login')
})

router.get('/signup', function(req, res){
  res.render('signup')
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
        error: 'Bad email or password'
      })
    }
  })
})

router.post('/login', function(req, res){
  const email = req.body.email
  const password = req.body.password
  database.createUser(email, password).then(userId => {
    if (userId){
      req.session.userId = userId
      res.render('profile')
    }else{
      res.render('signup', {
        error: 'Account already associated with this email'
      })
    }
  })
})

router.post('/signup', function(req, res) {
    const attributes = req.body.user
    const email = attributes.email
    const password = attributes.password
    const password_confirmation = attributes.password_confirmation
    if (req.body.password !== '' && req.body.password !== req.body.password_confirmation){
      res.render('signup', {
        error: 'passwords do not match',
        email: email,
      })
      } else {
        database.createUser({
          email: email,
          password: password,
        }).then(user => {
          req.session.user.id = users.id
          req.redirect('/')
        }).catch(error => {
          res.render('signup', {
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
