'use strict';

/**
 * Returns values for Mailgun email automation services
 * @returns {object} - the object composed of key and domain
 */
module.exports.returnMailgun = function() {

  return {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }

}

/**
 * Returns the password for the web API
 * @returns {string} - the password for the various endpoints
 */
module.exports.returnApiPassword = function() {

  return process.env.API_PASSWORD;

}

/**
 * Returns the URI for the Mongo database
 */
module.exports.returnDbUri = function() {

  return process.env.MONGOLAB_URI;

}

/**
 * Returns the secret for the JSON web token
 */
module.exports.returnJwtSecret = function() {

  return process.env.JWT_SECRET;

}