var express = require('express');
var app = express();

// Librerías
var auth = require('basic-auth');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var r = require('jsrsasign');

var models = require('./models/model').models;

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

// New Task
exports.newTask = function(request, response)   {  
    response.setHeader('Content-Type', 'application/json');
    var TaskCount;
    if (request.body.text && request.body.done && request.body.date) {
        // 
        if (models.length > 0) {
          TaskCount = (models[models.length-1].id);
        } else {
          TaskCount = 0;
        }

        request.body.id = TaskCount + 1;
        request.body.createdAt = new Date();
        request.body.updatedAt = new Date();

        models.push(request.body);
        response.send(  ' { "id:" :' + request.body.id + '}');   
        // 
    } else {
        response.status(400);
        response.send("Error");
    }
};
// Get Tasks
exports.getTasks = function(request,response)   {
    response.setHeader('Content-Type', 'application/json');
    response.send(models);
};
// Get Token
exports.getToken = function(request,response)   {
    response.setHeader('Content-Type', 'application/json');
    var userReq = request.body.username;
    var passReq = request.body.password;
    
    // Header
    let header = {
        alg: "HS256",
        typ: "JWT"
    };
    
    //Payload
    let payload = { };
      
    // Reserved claims (metadata of the JWT)
    payload.iat = r.jws.IntDate.get('now'); 
    payload.user = userReq;
    payload.pass = passReq;
    // Private claims (our info we want to send)
    payload.secretCode = 'p4ssw0d';
    payload.currentState = 'purchase-cart';

    // Signature
    let secretR = passReq;
    let jwt = r.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secretR);
    jwtUser = {"token": jwt}
    
    // JWT Resultado
    response.send(jwtUser);
};
// Delete Task
exports.deleteTask= function(request,response)  {
    response.setHeader('Content-Type', 'application/json');

    for (var i = 0; i < models.length; i++) {
        if (models[i].id == request.params.id)  {
            models.splice(i , 1);
            response.send("Task deleted");
        }
    }

    response.send("Error");
};