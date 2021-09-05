'use strict';
const {verifyAccessToken} = require ("../helpers/jwt_helper")
const JWT = require('jsonwebtoken');
var utils = require('../utils/writer.js');
var User = require('../service/UserService');

var utils = require('../utils/writer.js');
var Product = require('../service/ProductService');

module.exports.addProduct = function addProduct (req, res, next) {
  var body = req.swagger.params['body'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, "122212", function(err, decoded) {
    console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Product.addProduct(body)
    .then(function (response) {
      utils.writeJson(res, "Product added successfully", response, 200);
    })
    .catch(function (response) {
      utils.writeJson(res, "Invalid input", response, 405);
    });
  });
};

module.exports.createProdutWithArrayInput = function createProdutWithArrayInput (req, res, next) {
  var body = req.swagger.params['body'].value;
  Product.createProdutWithArrayInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProduct = function deleteProduct (req, res, next) {
  var productId = req.swagger.params['productId'].value;
  var api_key = req.swagger.params['api_key'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, "122212", function(err, decoded) {
    console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Product.deleteProduct(productId,api_key)
    .then(function (response) {
      utils.writeJson(res, "Product successfully deleted" , response,200);
    })
    .catch(function (response) {
      if(response == 400){
        utils.writeJson(res, "Invalid provided ID" , response, 400);
      }else{
        utils.writeJson(res, "Product not found" , response, 404);
      }
    });
  });
};

module.exports.getProductById = function getProductById (req, res, next) {
  var productId = req.swagger.params['productId'].value;
  var token = req.headers['x-access-token'];
  console.log("Token",token);
  if (!token) utils.writeJson(res, "No token provided.", 400);
    verifyAccessToken(req, "122212", function(err, decoded) {
    console.log(err);
  if (err)
   utils.writeJson(res, "You must be authenticate to get the requested response", 401);
  else console.log("Token validado com sucesso");
  Product.getProductById(productId)
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

module.exports.updateProductWithForm = function updateProductWithForm (req, res, next) {
  var productId = req.swagger.params['productId'].value;
  var name = req.swagger.params['name'].value;
  var status = req.swagger.params['status'].value;
  Product.updateProductWithForm(productId,name,status)
    .then(function (response) {
      utils.writeJson(res, "Product updated successfully", response, 200);
    })
    .catch(function (response) {
      utils.writeJson(res, "Product not found", response, 404);
    });
};
