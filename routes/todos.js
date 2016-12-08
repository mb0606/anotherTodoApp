var express = require('express');
var router = express.Router();
var db = require('../db')


router.get('/todos', function(req, res, next){
  db.fetchTodos(req, res)
});

router.get('/todos/:id', function(req, res, next){
  db.fetchTodo(req, res, req.params.id)
});

router.post('/todos', function(req, res, next){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted + '')){
    res.json({
      "error":"Invalid Data"
    }).status(401);

  }
  db.createTodo(req, res, todo);
})

router.put('/todos/:id', function(req, res, next){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted + '')){
    res.json({
      "error":"Invalid Data"
    }).status(401);

  }
  db.updateTodo(req, res, todo, req.params.id);
})

router.delete('/todos/:id', function(req, res, next){
  db.destroyTodo(req, res, req.params.id);

})

module.exports = router;
