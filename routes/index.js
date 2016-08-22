var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tern To Do List' });
});

module.exports = router;
