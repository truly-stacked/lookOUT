const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  //FacebookStrategy = require('passport-facebook').Strategy,

// Passport Strategy
passport.use(new LocalStrategy(
  function(username, password, done){
    //database dummy
    if (username === 'devil' && password ==='666'){
      done(null, {
        id: 666,
        firstname: 'devil',
        lastname :' name',
        email: 'devil@hello.com',
        verified: 'true'
      });
    }else {
      done(null, false);
    }
  }
));

module.exports = passport;