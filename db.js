var mongojs = require('mongojs');
var config = require('./db.config');

var db = mongojs('mongodb://'+config.username+':'+config.password +'@ds127928.mlab.com:27928/anothertodo', ['todos'])

exports.fetchTodos = function(req, res) {
  db.todos.find(function(err, todos){
    if(err){
      res.send(err).status(500);
    } else {
      res.json(todos).status(200);
    }
  })
}

exports.fetchTodo = function(req, res, id) {
  db.todos.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, todo){
    if(err){
      res.send(err).status(500);
    } else {
      res.json(todo).status(200);
    }
  })
}

exports.createTodo = function(req, res, todo) {
  db.todos.save(todo, function(err, result){
    if(err) {
      res.send(err).status(500);
    } else {
      res.json(result).status(200);
    }
  });
}


exports.updateTodo = function(req, res, todo, id) {
  db.todos.update({
    _id: mongojs.ObjectId(id)
  }, todo , function(err, result){
    if(err){
      res.send(err).status(500);
    } else {
      res.json(result).status(200);
    }
  });
}

exports.destroyTodo = function(req, res, id){
  db.todos.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, result){
    if(err){
      res.send(err).status(500);
    } else {
      res.json(result).status(200);
    };
  })
}