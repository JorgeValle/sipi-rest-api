const passport = require('passport'),
      localStrategy = require('passport-local').Strategy,
      facebookStrategy = require('passport-facebook').Strategy,
      mongoose = require('mongoose');

// bringing in models
const user = mongoose.model('User');

passport.use(new localStrategy({
  usernameField: 'email'
  },
  function(username, password, done) {
    user.findOne({
      email: username
    }, function(err, user) {

      if (err) {
        return done(err);
      };

      if (!user) {
        return done(null, false, {
          message: 'Incorrect User'
        });
      };

      if (!user.validatePassword(password)) {
       return done(null, false, {
         message: 'Incorrect Password'
       });
      };

    return done(null, user);

    });
  }
));