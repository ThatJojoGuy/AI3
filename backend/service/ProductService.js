'use strict';


/**
 * Add a new product
 * 
 *
 * body Product Product that needs to be added to the company
 * no response value expected for this operation
 **/
exports.addProduct = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of products with given input array
 * 
 *
 * body List List of products
 * no response value expected for this operation
 **/
exports.createProdutWithArrayInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a product
 * 
 *
 * productId Long Product id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteProduct = function(productId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Search for a product by ID
 * Returns only one product
 *
 * productId Long ID of product to return
 * returns Product
 **/
exports.getProductById = function(productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a product with form data
 * 
 *
 * productId Long Product ID that needs to be updated
 * name String Updates the product name (optional)
 * status String Updates product status (optional)
 * no response value expected for this operation
 **/
exports.updateProductWithForm = function(productId,name,status) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

