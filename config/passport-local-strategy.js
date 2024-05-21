const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email,password,done){
    User.findOne({email:email})
    .then(function(user){
        if(!user || user.password!=password){
            console.log('invalid username/password');
            return done(null,false , {message: "error username/password"});
        }
        console.log('newlocalstrategy')
        return done(null,user);
    })
    .catch(function(err){
        console.log('error in finding user --> passport');
        return done(err , {message: "user does not exists"});
    })
}));

passport.serializeUser(function(user,done){
    console.log('serialize user');
    done(null,user.id);
});

passport.deserializeUser(function(id, done) {

  User.findById(id)
    .then(function(user) {
      if (!user) {
        console.log('User not found');
        done(null, false);
      }

      console.log('deserialize user', user);
      done(null, user);
    })
    .catch(function(err) {
      console.log('Error in finding user --> Passport', err);
      done(err, false);
    });
});


  passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
  
    return res.send('Authentication error');
  } 
  
  passport.setAuthenticatedUser = function(req, res, next) {

    console.log('setAuthenticatedUser passport');
    
    if(!req.isAuthenticated()){
      console.log("not authenticate request setsuthuserpassport");
    }

    if (req.isAuthenticated()) {
      console.log(req.user , "from set authuser");
      res.json(req.user);
    }
  
    next();
  };
  

  module.exports = passport;