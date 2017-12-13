var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var auth = require('./auth');

/* GET users listing. */
router.get('/getuser',auth.required, function(req, res, next) {

  User.findById(req.payload.id, function(err, user) {
    if (err) {
      return res(500).json({ 
        "Success": false, 
        "msg": "Fail" 
      });
    }
    if (!user) {
      return res(401).json({ 
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
  console.log(req.body)
  user.full_name=req.body.fullname;
  user.email=req.body.email;
  user.mobileno=req.body.mobile;
  user.setPassword(req.body.password);

  user.save(function(err,data){
    console.log(data)
    if (err) {
      return res(500).json({ 
        "Success": false, 
        "msg": "Registration Fail" 
      });

  }
    if (!data) {
      return res(401).json({ 
        "Success": false, 
        "msg": "Registration Fail" 
      });

  } else {
    return res.status(200).json({
      "Success":true, 
      "msg":"Registred successfully..."
    });
  }
  })

});

router.post('/login',function(req,res,next){
  console.log("Entered login module..")
  
  console.log(req.body)
  User.findOne({$or:[{email:req.body.email},{mobileno:req.body.email}]},function(err,data){
    console.log(data)
    if (err) {
     
      return res(500).json({ 
        "Success": false, 
        "msg": "Invalid login credentials" 
      });
      
  }
  if (!data) {

    return res(401).json({
       "Success": false, 
       "msg": "Invalid login credentials" 
  });
    
}

  if (!data.validPassword(req.body.password)) {
      // return res.status(401).json({
      //     title: 'Login failed',
      //     error: { message: 'Invalid login credentials' }
      // });
      return res(401).json({ 
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

module.exports = router;
