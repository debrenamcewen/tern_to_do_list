var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');
var database = require('../database');
var cookieParser = require('cookie-parser');

router.get('/', function(req, res){
  res.render('profile', {
    session: req.session
  });
});

module.exports = router;
