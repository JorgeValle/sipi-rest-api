'use strict';

// packages
const mongoose = require('mongoose'),
      fs = require('fs'),
      passport = require('passport');

// services
const emailService = require('../services/email.service'),
      guidService = require('../services/guid.service'),
      jsonService = require('../services/json.service');

require('../config/passport.config');

// models
const user = mongoose.model('User');

// setting the API password for local and production environments
var apiPassword = 'whatpassword';

if (process.env.NODE_ENV === 'production') {
  apiPassword = process.env.API_PASSWORD;
}

/**
 * Cancels user membership
 */
module.exports.cancelMembership = function(req, res) {

}

/**
 * Updates user email preferences
 */
module.exports.updateEmailPreferences = function(req, res) {

}

/**
 * Logs the user out
 */
module.exports.logOut = function(req, res) {

}

/**
 * Logs a user into the system
 * @param
 * @param
 * @returns
 */
module.exports.login = function(req, res) {


  if (!req.body.email || !req.body.password) {
    jsonService.sendResponse(res, 400, {
      'message': 'All fields required'
    });
    return;
  }

  // use the local passport strategy
  passport.authenticate('local', function(err, user, info) {

    var token;

    // for if passport fails
    if (err) {
      jsonService.sendResponse(res, 404, err);
      return;
    }

    // we found a user, lets give them a jwt
    if (user) {

      token = user.generateJWT();

      // update their last login date
      user.date.lastLogin = Date.now();

      jsonService.sendResponse(res, 200, {
        'id': user.system.id,
        'token' : token
      });

      // welcome them with an email
      emailService.sendWelcome(user);

    }

    // if it hits here somethings really wrong
    else {

      jsonService.sendResponse(res, 401, info);

    }
  })(req, res);

}

/**
 * Registers a new user
 * @todo Fix setting of id
 * @param
 * @param
 * @returns
 */
module.exports.signup = function(req, res) {

  // create the new user object from request body
  let newUser = new user({
    personal: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    privacy: {
      consent: req.body.consent
    }
  });

  // run method to set hash and salt
  newUser.setPassword(req.body.password);

  // @todo Bring in the id service
  // temporarily set id
  newUser.system.id = Math.floor((Math.random() * 1000) + 1);

  newUser.save(function(err, newUser) {
  
    var token;
    
    if (err) {
      console.log(err);
      jsonService.sendResponse(res, 400, err);
    } else {
      console.log('New user was created');
      token = newUser.generateJWT();
      jsonService.sendResponse(res, 201, {
        'token': token
      });
    }
  });

}