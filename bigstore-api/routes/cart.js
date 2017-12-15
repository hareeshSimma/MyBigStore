var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');

var auth = require('./auth');


router.get('/cartitems/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findOne({_id: req.params.id }).then(function(result) {
        if (!result) { return res.sendStatus(401); }
        return res.json({ result });
    }).catch(next);
});

router.post('/additems', function(req, res, next) {
    console.log(req.body)
    User.findOne({_id:req.body.id},function(err,data){
        if(!data){
            res.json({ 
                "Success": false, 
                "msg": " No User found." 
              }); 
        }
        else{
            var item = {
            name:req.body.name,
            qty:req.body.qty,
            href:req.body.href,
            weight:req.body.weight,
            cost:req.body.cost
        }
        data.items.push(item);
        //data.save();
        data.save(function(err,data){
                if(err)
                throw err;
                res.json({ 
                    "Success": true, 
                    "msg": " Item Successfully added." 
                  }); 
            })

        console.log(data);
        }
    })

 });
module.exports = router;