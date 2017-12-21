var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var auth = require('./auth');
var mailer = require('../config/mailer');
var mailConfig = require("../config/config.json").mailer;
var mail = new mailer();
/* GET users listing. */
router.get('/getuser',auth.required, function(req, res, next) {

  User.findById(req.payload.id, function(err, user) {
    if (err) {
      return res.status(500).json({ 
        "Success": false, 
        "msg": "Fail" 
      });
    }
    if (!user) {
      return res.status(401).json({ 
        "Success": false, 
        "msg": "login Fail, please login again" 
      });
    } else {
        var token = user.generateJWT();
        var user = user.toAuthJSON();
        res.status(200).json({
            token: token,
            user: user
        });
    }
})
});

router.post('/usercreation',function(req,res,next){
  console.log("Entered Registred module..")
  
  var user=new User();
 // console.log(req.body)
  user.full_name=req.body.fullname;
  user.email=req.body.email;
  user.mobileno=req.body.mobile;
  user.setPassword(req.body.password);

  user.save(function(err,data){
    //console.log(data)
    if (err) {
      return res.status(500).json({ 
        "Success": false, 
        "msg": "Registration Fail" 
      });

  }
    if (!data) {
      return res.status(401).json({ 
        "Success": false, 
        "msg": "Registration Fail" 
      });

  } else {

    let mailOptins = {
      "subject": "Welcome to Bigstore",
      "html": '<b>Dear ' + req.body.fullname + '</b><p>Your Registration is Successfully Done.</p>'
    
  }
  mail.Transport(mailOptins, req);

    return res.status(200).json({
      "Success":true, 
      "msg":"Registred successfully..."
    });
  }
  })

});

router.post('/login',function(req,res,next){
   console.log(req.body)
  User.findOne({$or:[{email:req.body.email},{mobileno:req.body.email}]},function(err,data){
    console.log(data)
    if (err) {
     
      return res.status(500).json({ 
        "Success": false, 
        "msg": "Invalid login credentials" 
      });
      
  }
  if (!data) {

    return res.status(401).json({
       "Success": false, 
       "msg": "Invalid login credentials" 
  });
    
}

  if (!data.validPassword(req.body.password)) {
      
      return res.status(401).json({ 
        "Success": false, 
        "msg": "Invalid login credentials" 
      });
      
  }
  else{
 var token = data.generateJWT();
  var user = data.toAuthJSON();
  res.status(200).json({
      "Success":true,
      "msg": 'Successfully logged in',
      token: token,
      user: user
  });

  }
  })
});


router.post('/forgotpassword',function(req,res,next){
  
  console.log(req.body);
  User.findOne({$or:[{email:req.body.email},{mobileno:req.body.email}]},function(err,data){
    console.log(data)
    if (err) {
      
     return  res.status(500).json({ 
         "Success": false, 
         "msg": "Invalid emailId/Mobile Number" 
       });
       
   }
   if (!data) {
 
    return  res.status(401).json({
        "Success": false, 
        "msg": "Invalid Email Id/Mobile Number" 
   });
     
 }

 if(data){
   let otp=Math.floor(Math.random() * 2000000);
   console.log(otp);
   data.otp=otp;
   let mailOptins = {
    "subject": "Forgot Password - OTP",
    "html": '<b>Dear ' + req.body.fullname + '</b><p>Your One Time Password  is:'+ otp+'</p>'
  
}
mail.Transport(mailOptins, req);
   data.save(function(err,data){
     if(err)
     throw err;
     res.json({ 
      "Success": true, 
      "msg": " OTP Send To Your Registred Email ID  Successfully." 
    }); 
   })
 }
  })    

});

router.post('/verifyotp',function(req,res,next){
  User.findOne({$or:[{email:req.body.email},{mobileno:req.body.email}]},function(err,data){
    console.log(data)
    if (err) {
      
     return  res.status(500).json({ 
         "Success": false, 
         "msg": "Not a valid User." 
       });
       
   }
   if (!data) {
 
    return  res.status(401).json({
        "Success": false, 
        "msg": "Not a valid User." 
   });
     
 }

 if(data.otp===req.body.otp){
   
  return  res.status(200).json({
    "Success": true, 
    "msg": "Entered OTP Correct." 
});
}
else{
  return  res.status(500).json({
    "Success": false, 
    "msg": "In correct OTP Entered." 
});
}

  })    

});

router.put('/setpassword',function(req,res,next){
  var user = new User();
  User.findOne({$or:[{email:req.body.email},{mobileno:req.body.email}]},function(err,data){
    console.log(data)
    if (err) {
      
     return  res.status(500).json({ 
         "Success": false, 
         "msg": "Not a valid User." 
       });
       
   }
   if (!data) {
 
    return  res.status(401).json({
        "Success": false, 
        "msg": "Not a valid User." 
   });
     
 }
if(data){
  data.setPassword(req.body.password)
  data.save(function(err,data){
if (err)
throw err;
return  res.status(200).json({
  "Success": true, 
  "msg": "Password update successfully." 
});
  })

  
}


})

});


module.exports = router;
