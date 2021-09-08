'use strict';

const express = require ('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');
const jwt_helper = require('../helpers/jwt_helper');
const {signAccessToken} = require ("../helpers/jwt_helper")
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//conectar a base de dados
const { Int32 } = require('mongodb');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/AI", {
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
const UserSchema = new Schema({
  'firstName': String,
  'lastName': String,
  username: {
    type: String,
    required: true,
    lowercase: true
    //unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  'userStatus': Number,
  'phone': String,
  'id': Number,
  'email': String
})

//Incrementar o id
const AutoIncrement = require('mongoose-sequence')(mongoose);
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});

//Hashing da password
UserSchema.pre('save', async function (next) {
  try {
    /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
    */
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    if(body.username == "" || body.password =="")
    {
      reject(400);
  }else{
      const USer_ = mongoose.model('utilizador', UserSchema);
      const NewUSer = new USer_(body);
      NewUSer.save(function (err, result) {
        if (err){
          reject(406);
        }else{
          console.log(result);
          resolve(201); 
        }
        //Salvar
        const savedUser =  NewUSer.save();
      });
    }
  });
}


/**
 * Creates list of users with given input array
 * 
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithArrayInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * userId String The ID that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(userId) {
  return new Promise(function(resolve, reject) {
    if(userId == "")
    {
      reject(400);
    }else{
    const USer_ = mongoose.model('utilizador', UserSchema);
    console.log(userId);
    USer_.findOneAndDelete({ id: userId }, function (err, id) {
     if(id == null){
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
 * Logs user into the system
 * 
 *
 * username String The user name for login
 * password String The password for login in clear text
 * no response value expected for this operation
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    if(username == "" || password =="")
    {
      reject(400);
      console.log("não introduziu o username ou/e a password");
  }else{
    const USer_ = mongoose.model('utilizador', UserSchema);
     USer_.findOne({username: username}, function(err, user) { 
      if(user){
        bcrypt.compare(password, user.password, function (err, res) {
          if(err){
            console.log("passwords do not match 1");
            response.json({success: false, message: 'passwords do not match'});
          }if(res){
            // Send JWT
            const accessToken = signAccessToken("122212");
            accessToken.then(function (result) {
             console.log({result})
           })
            resolve(200)
            console.log("token");
          }else{
            reject(406)
            console.log("password do not match");
          }
        })
      }
     else{
       reject(404)
       console.log("não existe utilizador")
     }   
     }); 
    }
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * userId String ID that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(userId,body) {
  return new Promise(function(resolve, reject) {
    if(userId == "")
    {
      reject(400);
      console.log("campo não preenchido");
    }else{
    const USer_ = mongoose.model('utilizador', UserSchema);
    USer_.findOneAndUpdate({ id: userId}, body, function (err, id) {
      if(id == null){
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

