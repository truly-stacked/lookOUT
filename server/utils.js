
const express = require('express'),
  path = require ('path'),
  cookieParser = require ('cookie-parser'),
  expressHandlebar = require('express-handlebars'),
  expressValidator = require('express-validator'),
  flash = require ('connect-flash'),
  session = require ('express-session'),
  morgan = require ('morgan'),
  bodyParser = require('body-parser'),
  passport = require ('passport'),
  LocalStrategy = require ('passport-local').Strategy,
  mongoose = require('mongoose');


module.exports.createApp = function (){


const app = express(),
  secret = process.env.secret;
  database = process.env.mongodbUrl;
  console.log(database);

// initial setup of application

 


// View Engine
  //app.set('client', path.join(__dirname, 'views'));
  app.use(express.static('./client'));
  app.engine('handlebars', expressHandlebar({defaultLayout: 'layout'}));
  app.set('view engine', 'handlebars');

// Middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(cookieParser());

  app.use(session ({
    secret: 'MikeThinkFWD',
    saveUninitialized: true, 
    resave: true
  }));

//passport initialize
  app.use(passport.initialize());
  app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
       root    = namespace.shift(),
       formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash -- Feature not implemented yet
app.use(flash());

// Global Variables
app.use(function (req, res, next){

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();

});

// Connect to mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(database, function(err) {
    if (err) {
      console.log('Fail, did not connect');
    } else {
      console.log('I got in MONGO !');
    }
});


// Connect the routes
require('./routes.js')(app, express);

return app;
};

//checked if any value is null. It will replace the null with a TBD.
// Used recussion to go through each element.
module.exports.nullChecker = function (event, arrayKeys){
  let solution = "",
    position = 0,
    checkAllValue = (obj, key) => {
      position +=1;
      if (obj[key] === null){
        return "TBD";
      } else if (obj[key] === undefined){
        return obj;
      }
        return checkAllValue(obj[key], arrayKeys[position]);
    };
  solution = checkAllValue(event, arrayKeys[position]);
  return solution;
};
