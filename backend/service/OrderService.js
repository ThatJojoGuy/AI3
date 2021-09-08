'use strict';

var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//conectar a base de dados
const { Int32 } = require('mongodb');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/AI3_V2", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// we're connected!
const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Conectámos à BD!")
}); 

//Schema do Utilizador
const OrderSchema = new Schema({
  'orderId': Number,
  'productId': Number,
  'userId': Number,
  'quantity': Number,
  'shipDate': String,
  'status': String,
  'complete': Boolean
})

//Incrementar o id
const AutoIncrement = require('mongoose-sequence')(mongoose);
OrderSchema.plugin(AutoIncrement, {inc_field: 'orderId'});

/**
 * Deletes order by ID
 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 *
 * orderId Long ID of the order that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteOrder = function(orderId) {
  return new Promise(function(resolve, reject) {
    if(orderId == "")
    {
      reject(400);
    }else{
    const ORder_ = mongoose.model('encomenda', OrderSchema);
    console.log(orderId);
    ORder_.findOneAndDelete({ orderId: orderId }, function (err, orderId) {

     if(orderId == null){
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
 * Find order by id
 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 *
 * orderId Long ID of order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    const ORder_ = mongoose.model('encomenda', OrderSchema);
    ORder_.find({orderId : orderId}, function (err, orders, orderId) { 
     if(orderId !== null){
      resolve(orders);
     }else{
      reject(err, 400);
     }
    }); 
    
  });
}


/**
 * Place an order for a product
 * 
 *
 * body Order Order placed for purchasing the product
 * returns Order
 **/
exports.placeOrder = function(body) {
  return new Promise(function(resolve, reject) {
    const ORder_ = mongoose.model('encomenda', OrderSchema);
    const NewOrder = new ORder_(body);
    NewOrder.save(function (err, result) {
      if (err){
        reject(406);
      }else{
        console.log(result);
        resolve(201); 
      }
      //Salvar
      const savedOrder =  NewOrder.save();
    });    
});
}


/**
 * Update order
 * This can only be done by the logged in user.
 *
 * orderID String The id that needs to be updated
 * body Order Update order object
 * no response value expected for this operation
 **/
exports.updateOrder = function(orderID,body) {
  return new Promise(function(resolve, reject) {
    if(orderID == "")
    {
      reject(400);
      console.log("campo não preenchido");
    }else{
    const ORder_ = mongoose.model('encomenda', OrderSchema);
    ORder_.findOneAndUpdate({ orderId : orderID}, body, function (err, orderId) {
        console.log(orderId);
      if(orderId == null){
        console.log("orderId not found");
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

