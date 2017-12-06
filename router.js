var express = require('express');
var app = express();

// Librerías
var auth = require('basic-auth');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const r = require('jsrsasign');

const myTaskController = require('./controller/task_controller.js');
var models = require ('./models/model').models;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST TASK
app.post('/api/tasks', myTaskController.newTask);
// SHOW TASKS
app.get('/api/tasks', myTaskController.getTasks);
// DELETE TASK
app.delete('/api/tasks/:id', myTaskController.deleteTask)
// GET TOKEN FROM USER
app.post('/api/auth/token', myTaskController.getToken )

exports.app = app;