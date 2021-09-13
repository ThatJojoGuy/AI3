'use strict';
const {signAccessToken} = require ("../helpers/jwt_helper")
const {verifyAccessToken} = require ("../helpers/jwt_helper")
const { jwtSecret } = require("../helpers/config")
const JWT = require('jsonwebtoken');
var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, "Created used", response, 201);
    })
    .catch(function (response) {
      if(response== 400){
        utils.writeJson(res,"Invalid username/password supplied", response);
      }else{
        utils.writeJson(res,"Not Acceptable", response, 406);
      } 
    });
};

module.exports.createUsersWithArrayInput = function createUsersWithArrayInput (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createUsersWithArrayInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  console.log("ola",userId);

  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, jwtSecret, function(err, decoded) {
  console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  
  User.deleteUser(userId) 
    .then(function (response) {
      utils.writeJson(res, "User successfully deleted", response, 200);
    })
    .catch(function (response) {
      if(response == 400){
        utils.writeJson(res, "Invalid user Id supplied", response);
        }
        if(response == 404){
          utils.writeJson(res, "Id not found", response);
        }
    });
  });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.loginUser(username,password)
    .then(function (response) {
      utils.writeJson(res, "Login successful", response, 200);
    })
    .catch(function (response) {
      if(response == 406){
        utils.writeJson(res, "Password not acceptable", response);
      }
      if(response == 404){
        utils.writeJson(res, "Not found username", response);
      }
      else{
        utils.writeJson(res, "Invalid username/password supplied", response, 400);
      }
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUser = function updateUser (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var body = req.swagger.params['body'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
  verifyAccessToken(req, jwtSecret, function(err, decoded) {
    console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  User.updateUser(userId,body)
    .then(function (response) {
      utils.writeJson(res, "User updated successfully", response, 200);
    })
    .catch(function (response) {
      if(response == 404){
        utils.writeJson(res, "User not found", response);
      }
      else{
        utils.writeJson(res, "Invalid user supplied", response, 400);
      }
    });
  });
};
