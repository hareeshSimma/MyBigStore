var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UploadproductSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    description: { type: String, required: false },
    image:{type:String,required:false},
    cost:{type:String,required:true},
    weight:{type:String,required:true},
    quantity:{type:String,required:false},
    productId:{type:String,required:false},
    productcode:{type:String,required:false}
    
}, { timestamps: true });

UploadproductSchema.plugin(uniqueValidator, { message: 'is already taken.' });
mongoose.model('Uploadproduct', UploadproductSchema);