'use strict';
const {verifyAccessToken} = require ("../helpers/jwt_helper")
const { jwtSecret } = require("../helpers/config")
var utils = require('../utils/writer.js');
var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, jwtSecret, function(err, decoded) {
  console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Order.deleteOrder(orderId)
    .then(function (response) {
      utils.writeJson(res, "Order successfully deleted", response, 200);
    })
    .catch(function (response) {
      if(response == 400){
        utils.writeJson(res, "Invalid order Id supplied", response);
        }
        if(response == 404){
          utils.writeJson(res, "Id not found", response);
        }
      });
  });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, jwtSecret, function(err, decoded) {
  console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      if(response == 404){
        utils.writeJson(res, "Order not found", response);
      }
      else{
        utils.writeJson(res, response, 400);
      }
    });
  });
};

module.exports.placeOrder = function placeOrder (req, res, next) {
  var body = req.swagger.params['body'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, jwtSecret, function(err, decoded) {
  console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Order.placeOrder(body)
    .then(function (response) {
      utils.writeJson(res, "Order Create",response, 201);
    })
    .catch(function (response) {
      if(response == 406){
        utils.writeJson(res, "Not Acceptable", response);
      }
      else{
        utils.writeJson(res, "you must be authenticate to get the requested response", response, 401);
      }  
    });   
  });
};

module.exports.updateOrder = function updateOrder (req, res, next) {
  var orderID = req.swagger.params['orderID'].value;
  var body = req.swagger.params['body'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, jwtSecret, function(err, decoded) {
  console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Order.updateOrder(orderID,body)
    .then(function (response) {
      utils.writeJson(res, "update order was successful", response, 200);
    })
    .catch(function (response) {
      if(response == 404){
        utils.writeJson(res, "Order not found", response);
      }
      else{
        utils.writeJson(res, "Invalid order", response, 400);
      }
    });
  });
};
