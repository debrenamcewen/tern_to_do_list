var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');
var database = require('../database');

router.get('/', function(req, res){
    res.render('login');
});

module.exports = router;
