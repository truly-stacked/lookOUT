// const passport = require('passport'),
//   User = require('/model/userModel.js'),
//   utils = require('')
//   LocalStrategy = require('passport-jwt').Strategy;
//   //FacebookStrategy = require('passport-facebook').Strategy,
//
//
// module.exports = function(passport){
//   var options = {};
//   options.secretOrKey = process.env.secret;
//   passport.use(new LocalStrategy(options, function(payload,done){
//     User.findOne({id: payload.id}, function(err,user){
//       if(err){
//         return done(err, false);
//       }
//       if(user){
//         console.log(user);
//         return done(null, user);
//       } else{
//         done(null, false);
//       }
//     });
//   }));
// };

























// // Passport Strategy
// passport.use(new LocalStrategy(
//   function(username, password, done){
//     //database dummy
//     if (username === 'devil' && password ==='666'){
//       done(null, {
//         id: 666,
//         firstname: 'devil',
//         lastname :' name',
//         email: 'devil@hello.com',
//         verified: 'true'
//       });
//     }else {
//       done(null, false);
//     }
//   }
// ));
//
// module.exports = passport;
