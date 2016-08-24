var express = require('express');
var router = express.Router();
var database = require('../database');

router.post('todo', function(req,res){
  const { title } = req.body
  database.addTo
})
