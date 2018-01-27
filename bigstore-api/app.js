var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var config=require('./config/database')
var cors = require('cors');
var multer = require("multer");

// connect to database 
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected successfully ' + config.database);
    console.log("connected successfully...")
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

//models imports
require('./models/User');
require('./models/Uploadproducts');

//configure routes here
var index = require('./routes/index');
var users = require('./routes/users');
var cart = require('./routes/cart');
var uploadproducts = require('./routes/uploadproducts');


var app = express();

//File Upload
var storage =   multer.diskStorage({

  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    console.log("file");
    callback(null, file.originalname);
  }
});
  var upload = multer({ //multer settings
                    storage: storage
                }).single("file");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/cart', cart);
app.use('/uploadproducts', uploadproducts);

app.get('/*',function(req,res){
  res.sendFile(__dirname+'/dist/index.html');
})

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/uploads', function(req, res,next) {
  console.log("file upload")
  upload(req,res,function(err){
      // console.log(req.body);
         console.log(req.file);
         if(err){
              res.json({error_code:1,err_desc:err});
              return;
         }
          res.json({error_code:0,err_desc:null});
     });
     // next();
 });

module.exports = app;
