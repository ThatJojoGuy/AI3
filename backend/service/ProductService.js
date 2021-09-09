'use strict';
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

 //ligação a bd
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/AI3_V2", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// we're connected!
const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Conectamos à BD!")
}); 

//schema dos produtos
const ProductSchema = new Schema({
  'productId': {
    type: Number
  },
  'name' :{
    type: String,
    required: true
  },
  'categoryName': {
    type: String
  },
  'categoryId':{
    type: Number
  },
  'status': {
    type: String
  }
})

//incrementar idProduct
const AutoIncrement = require('mongoose-sequence')(mongoose);
ProductSchema.plugin(AutoIncrement, {inc_field: 'productId'});

/**
 * Add a new product
 * 
 *
 * body Product Product that needs to be added to the company
 * no response value expected for this operation
 **/
exports.addProduct = function(body) {
  return new Promise(function(resolve, reject) {
    const PRod_ = mongoose.model('produto', ProductSchema);
    const NewProduct = new PRod_(body);
    
    NewProduct.save(function (err, result) {
      if (err){
        console.log(err);
        resolve(405);
      }else {
        console.log(result);
        resolve(200); 
        const savedProduct =  NewProduct.save();
      } 
  });
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
    if(productId == "")
    {
      reject(400);
    }else{
    const PRod_ = mongoose.model('produtos', ProductSchema);
      console.log(productId)
      PRod_.findOneAndDelete({productId: productId}, function(err, productId){
        if(productId == null){
          console.log("nao existe")
          reject(404)
        }else{
         console.log("Deleted");
         resolve(200)
        }
      })
    }
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
    const PRod_ = mongoose.model('produtos', ProductSchema);
    PRod_.find({productId : productId}, function (err, products, productId) { 
     if(productId !== null){
      resolve(products);
     }else{
      reject(err, 400);
     }
    }); 
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
   if(productId == "")
    {
      console.log(productId, "1");
      reject(400);
      console.log("campo não preenchido");
    }else{  
    const PRod_ = mongoose.model('produtos', ProductSchema);
    PRod_.findOneAndUpdate({ 1 : productId}, name, status, function (err, productId, name, status) {
      if(productId == null){
        console.log("userId not found");
        console.log(err);
        reject(404)
      }else{
        console.log("atualizou");
        resolve(200)
      }
     })   
    } 
     mongoose.set('useFindAndModify', false);
  });
}

