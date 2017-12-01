var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var auth = require('./auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
      return res.status(500).json({
          title: 'An error occurred',
          error: err
      });
  } else {
    return res.status(200).json({
      "success":true, "msg":"registred successfully..."
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
      return res.status(500).json({
          title: 'An error occurred',
          error: err
      });
  }
  // if (!data) {
  //     return res.status(401).json({
  //         title: 'Login failed',
  //         error: { message: 'Invalid login credentials' }
  //     });
  // }
  if (!data.validPassword(req.body.password)) {
      return res.status(401).json({
          title: 'Login failed',
          error: { message: 'Invalid login credentials' }
      });
  }
  else{
  //   return res.status(200).json({
  //     title: 'Login',
  //     success: { message: 'login Successfully' }
  // });

  var token = data.generateJWT();
  var user = data.toAuthJSON();
  res.status(200).json({
      success:true,
      message: 'Successfully logged in',
      token: token,
      user: user
  });

  }

  })
 

  

});

module.exports = router;
