var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Uploadproduct = mongoose.model('Uploadproduct');
var User = mongoose.model('User');
var auth = require('./auth');
var mailer = require('../config/mailer');
var mailConfig = require("../config/config.json").mailer;
var mail = new mailer();

router.get('/getproducts',function(req, res, next) {
    Uploadproduct.find({},function(err,products){
        if(err)
        throw err;
        return  res.status(200).json({ 
            products:products
          });
    })

})

router.post('/uploadproducts',auth.required,function(req,res,next){
console.log(req.body)

User.findById(req.payload.id, function(err, user) {
    if(err){
      return res.status(500).json({ 
        "Success": false, 
        "msg": "Fail to connection" 
      });
    }
    
    if (!user) {
      return res.status(401).json({ 
        "Success": false, 
        "msg": "Invalid user" 
      });
    }

    else{
        var uploadproduct=new Uploadproduct();
        uploadproduct.productname=req.body.productname;
        uploadproduct.description=req.body.description;
        uploadproduct.cost=req.body.cost;
        uploadproduct.weight=req.body.weight;
        uploadproduct.quantity=req.body.quantity;
        uploadproduct.image=req.body.image;

        var productName=req.body.productname.substring(0,4);
        productName.toUpperCase();
        var productId=productName+ Math.floor(Math.random() * 3000000);
        uploadproduct.productId=productId;

         uploadproduct.save(function(err,data){
            //console.log(data)
            if (err) {
              return res.status(500).json({ 
                "Success": false, 
                "msg": "Upload Fail" 
              });
        
          }
            if (!data) {
              return res.status(401).json({ 
                "Success": false, 
                "msg": "Upload Fail" 
              });
        
          } else {
        
        //     let mailOptins = {
        //       "subject": "Welcome to Bigstore",
        //       "html": '<b>Dear ' + req.body.fullname + '</b><p>Your Registration is Successfully Done.</p>'
            
        //   }
        //   mail.Transport(mailOptins, req);
        
            return res.status(200).json({
              "Success":true, 
              "msg":"Product Upload successfully..."
            });
          }
          })
        
        }
    });

})

module.exports = router;