var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var auth = require('./auth');


router.get('/cartitems/:id', function(req, res, next) {
    User.findOne({_id: req.params.id }).then(function(result) {
        if (!result) 
        { 
          return res.sendStatus(401); 
        }
        return res.status(200).json({ result });
    }).catch(next);
});
router.delete('/items/:id',auth.required, function (req, res, next) {
//  var selectedIndex;
console.log(req.params,req.payload.id);
  User.find({_id:req.payload.id},function(err,user){
       if (!user) { return res.sendStatus(401); }
              if(user[0].items.length>0){
               for(i=0;i<user[0].items.length;i++){
                  if(user[0].items[i].productId==req.params.id){
                    user[0].items.splice(i,1);
                    break;

            }
         }
         user[0].save();
          return res.status(200).json({ "Success": true, "msg": "Item deleted successfully" });
      }
   
   
  })
});


router.post('/additems', function(req, res, next) {
    console.log(req.body)
    User.findOne({_id:req.body.id},function(err,data){
        if(!data){
          return  res.status(401).json({ 
                "Success": false, 
                "msg": " Invalid data." 
              }); 
        }

        else{
            // let orderId= "OD"+ Math.floor((Math.random() * 10000000000) + 1);
            var item = {
            // orderId:orderId,
            name:req.body.productname,
            qty:req.body.qty, 
            href:req.body.image,
            weight:req.body.weight,
            cost:req.body.cost,
            productId:req.body.productId
        } 
        var  count = 0;
        data.items && (data.items).forEach((ele,i)=>{
       if(ele.productId == req.body.productId){
        count = 1;
        var qty = parseInt(ele.qty) + 1;
        ele.qty = qty.toString();
User.update({"items.productId" : req.body.productId}, {"$set" : {"items.$.qty" : ele.qty}},function(err,item){
  if(err)
    {
      return res.status(500).json({
        "Success": false, "msg": "In valid data entered" 
     });
    }
  return  res.status(200).json({ 
        "Success": true, 
        "msg": " Qty Successfully added." 
      }); 
  })


  }
        })

        // console.log(data.items)
        if(!count){
          data.items.push(item);
          data.save(function(err,data){
            if(err)
            {
              return res.status(500).json({
                "Success": false, "msg": "In valid data" 
             });
            }
          return  res.status(200).json({ 
                "Success": true, 
                "msg": " Item Successfully added." 
              }); 
        })
        }
        //data.save();
       

        }
    })

 });
 router.post('/buynow',auth.required,function(req, res, next) {
    console.log(req.body)
    User.findOne({_id:req.payload.id},function(err,data){
        if(err)
        {
          return res.status(500).json({
            "Success": false, "msg": "In valid data" 
         });
        }
        if(!data){
          return  res.status(401).json({ 
                "Success": false, 
                "msg": " No User found." 
              }); 
        }
        else{
            let orderId= "OD"+ Math.floor((Math.random() * 10000000000) + 1);
            var order = {
           orderId:orderId, 
           address:req.body.address,
           items:req.body.items, 
           totalAmount:req.body.PayableAmount,     
           date:Date()
        }
        data.orders.push(order);
        //data.save();
        data.save(function(err,data){
                if(err)
                {
                  return res.status(500).json({ 
                    "Success": false, 
                    "msg": "Order Failde" 
                  });
                }
                if(!data){
                  return res.status(401).json({ 
                    "Success": false, 
                    "msg": "In valid data" 
                  });
                }
              return res.status(200).json({ 
                    "Success": true, 
                    "msg": "Ordered Successfully Placed." 
                  }); 
            })

        }
    })

 });

//  get Orders
router.get('/getorders',auth.required, function(req, res, next) {

    User.findById(req.payload.id, function(err, orders) {
      if (err) {
        return res.status(500).json({ 
          "Success": false, 
          "msg": "Fail to connection" 
        });
      }
      if (!orders) {
        return res.status(401).json({ 
          "Success": false, 
          "msg": "Not get any data! plz Login " 
        });
      } else {
          var orders = orders.orders;
          
          res.status(200).json({
            orders: orders
          });
      }
  })
  });
  
  router.delete('/emptycart',auth.required, function (req, res, next) {
      User.findOne({_id:req.payload.id},function(err,user){
          // console.log(user)
          if(err){
          return res.status(500).json({
            "Success": false, "msg": "In valid data" 
         });
        }
           if (!user) { 
              return res.status(401).json({
                   "Success": false, "msg": "In valid data" 
                });
         }
         else{
          user.items=[];
          user.save(function(err,data){
            if(err)
            throw err;
          return res.status(200).json({ 
                "Success": true, 
                "msg": "Empty cart" 
              }); 
        })

         }
                  
           
       
      })
    });




module.exports = router;