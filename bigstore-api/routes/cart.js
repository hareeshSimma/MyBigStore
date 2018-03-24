var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var auth = require('./auth');
var mailer = require('../config/mailer');
var mailConfig = require("../config/config.json").mailer;
var mail = new mailer();

router.get('/cartitems/:id', function (req, res, next) {
  User.findOne({ _id: req.params.id }).then(function (result) {
    if (!result) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ result });
  }).catch(next);
});
router.delete('/items/:id', auth.required, function (req, res, next) {
  //  var selectedIndex;
  console.log(req.params, req.payload.id);
  User.find({ _id: req.payload.id }, function (err, user) {
    if (!user) { return res.sendStatus(401); }
    if (user[0].items.length > 0) {
      for (i = 0; i < user[0].items.length; i++) {
        if (user[0].items[i].productId == req.params.id) {
          user[0].items.splice(i, 1);
          break;

        }
      }
      user[0].save();
      return res.status(200).json({ "Success": true, "msg": "Item deleted successfully" });
    }


  })
});


router.put('/updateCart', auth.required, function (req, res, next) {
  console.log(req.body);
  User.findById({ _id: req.payload.id }, function (err, data) {
    if (!data) {
      res.json({
        "Success": false,
        "msg": " No User found."
      });
    }
    else {
      var dataToUpdate = [];
      for (var i = 0; i < data.items.length; i++) {
        dataToUpdate.push(data.items[i]);
        for (var j = 0; j < req.body.length; j++) {
          if (data.items[i].productId == req.body[j].pid) {
            dataToUpdate[i].qty = req.body[j].qty.toString();
            dataToUpdate[i].subtotal = req.body[j].cost;
            //  dataToUpdate[i]["subtotal"]=req.body[j].cost;

          }
        }
      }
      data.items = [];
      data.items = dataToUpdate;
      data.save(function (err, dat) {
        if (err) {
          return res.status(401).json({
            "Success": false,
            "msg": " Invalid data."
          });
        }
        return res.status(200).json({
          "Success": true,
          "msg": "cart updated"
        });
      })
    }
  })
})
router.post('/additems', function (req, res, next) {
  console.log(req.body)
  User.findOne({ _id: req.body.id }, function (err, data) {
    if (!data) {
      return res.status(401).json({
        "Success": false,
        "msg": " Invalid data."
      });
    }

    else {
      // let orderId= "OD"+ Math.floor((Math.random() * 10000000000) + 1);
      var item = {
        // orderId:orderId,
        name: req.body.productname,
        qty: req.body.qty,
        href: req.body.image,
        weight: req.body.weight,
        cost: req.body.cost,
        productId: req.body.productId,
        subtotal: req.body.subtotal,
        // cancel: false,
        // return: false
      }
      var count = 0;
      data.items && (data.items).forEach((ele, i) => {
        if (ele.productId == req.body.productId) {
          count = 1;
          var qty = parseInt(ele.qty) + 1;
          ele.qty = qty.toString();

          User.update({ "items.productId": req.body.productId }, { "$set": { "items.$.qty": ele.qty } }, function (err, item) {
            if (err) {
              return res.status(500).json({
                "Success": false, "msg": "In valid data entered"
              });
            }
            return res.status(200).json({
              "Success": true,
              "msg": " Qty Successfully added."
            });
          })


        }
      })

      // console.log(data.items)
      if (!count) {
        data.items.push(item);
        data.save(function (err, data) {
          if (err) {
            return res.status(500).json({
              "Success": false, "msg": "In valid data"
            });
          }
          return res.status(200).json({
            "Success": true,
            "msg": " Item Successfully added."
          });
        })
      }
      //data.save();


    }
  })

});

router.post('/buynow', auth.required, function (req, res, next) {
  console.log(req.body)
  User.findOne({ _id: req.payload.id }, function (err, data) {
    if (err) {
      return res.status(500).json({
        "Success": false, "msg": "In valid data"
      });
    }
    if (!data) {
      return res.status(401).json({
        "Success": false,
        "msg": " No User found."
      });
    }
    else {
      let orderId = "OD" + Math.floor((Math.random() * 10000000000) + 1);
      var order = {
        orderId: orderId,
        address: req.body.address,
        items: req.body.items,
        totalAmount: req.body.PayableAmount,
        paymentMethod:req.body.paymentMethod,
        cancel: false,
        return: false,
        cancellationId:false,
        date: Date()
      }
      data.orders.push(order);
      data.save(function (err, data) {
        if (err) {
          return res.status(500).json({
            "Success": false,
            "msg": "Order Failed"
          });
        }
        if (!data) {
          return res.status(401).json({
            "Success": false,
            "msg": "In valid data"
          });
        }else{

          let mailOptins = {
            "subject": "Your Mill to Meal Order  (" +orderId+ ") Confirmation",
            "html": '<b>Hello ' + data.full_name + '</b><p>Your Orders Placed  Successfully.</p>'+
            ' <p>Your Order Id is:'+orderId+'</p>'
          
        }

        mail.Transport(mailOptins, req);

        return res.status(200).json({
          "Success": true,
          "msg": "Ordered Successfully Placed."
        });
      }
      })

    }
  })

});

//  get Orders
router.get('/getorders', auth.required, function (req, res, next) {

  User.findById(req.payload.id, function (err, orders) {
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

router.delete('/emptycart', auth.required, function (req, res, next) {
  User.findOne({ _id: req.payload.id }, function (err, user) {
    // console.log(user)
    if (err) {
      return res.status(500).json({
        "Success": false, "msg": "In valid data"
      });
    }
    if (!user) {
      return res.status(401).json({
        "Success": false, "msg": "In valid data"
      });
    }
    else {
      user.items = [];
      user.save(function (err, data) {
        if (err)
          throw err;
        return res.status(200).json({
          "Success": true,
          "msg": "Empty cart"
        });
      })

    }



  })
});

router.post('/cancelitem/:id', auth.required, function (req, res, next) {
  User.findOne({ _id: req.payload.id }, function (err, orders) {
    // console.log(req.payload)
    if (err) {
      return res.status(500).json({
        "Success": false, "msg": "In valid user"
      });
    }
    if (!orders) {
      return res.status(401).json({
        "Success": false, "msg": "In valid user"
      });
    } else {

      // var cancelItems = (items.orders).filter(ele => {
      //   return ele.orderId == req.body.oId
      // })
      // console.log(cancelItems);
      // cancelItems[0].items && (cancelItems[0].items).forEach((ele, i) => {
      //   if (ele.productId == req.body.item.productId) {

        //   User.update({
        //     "orders": {
        //       "$elemMatch": {
        //         "orderId": req.body.oid, "items.productId": req.body.item.productId
        //       }
        //     }
        //   }, { $set: { "orders.$.items.$.cancel": true } }, {multi: true},
        // function (err, item) {
        //     console.log("@@@@@@@@@@", item)
        //     if (err) {
        //       return res.status(500).json({
        //         "Success": false, "msg": err
        //       });
        //     }
        //     return res.status(200).json({
        //       "Success": true,
        //       "msg": item
        //     });
        //   })

        orders.orders && (orders.orders).forEach((ele, i) => {
          console.log(ele);
          if (ele.orderId == req.params.id) {
            let cancelId = "CN" + Math.floor((Math.random() * 10000000000) + 100);
      
          User.update({ "orders.orderId": req.params.id}, { "$set": { "orders.$.cancel": true ,"orders.$.cancellationId":cancelId} }, function (err, order) {
            if (err) {
              return res.status(500).json({
                "Success": false, "msg": "In valid data entered"
              });
            }else{
              let mailOptins = {
                "subject": "Your Mill to Meal Order  (" +req.params.id+ ") Cancellation",
                "html": '<b>Hello ' + orders.full_name + '</b><p>Your Order Cancelled  Successfully.</p>'+
                ' <p>Your Order Cancellation Id is:'+cancelId+'</p>'
              
            }
    
            mail.Transport2(mailOptins, req);
            }
            return res.status(200).json({
              "Success": true,
              "msg": "Order Cancled "
            });
          })



         }
       })

    }

  })
})


module.exports = router;