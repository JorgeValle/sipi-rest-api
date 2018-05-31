'use strict';

Error.prototype.SipiError;

/**
 * Returns values for Mailgun email automation services
 * @returns {object} - the object composed of key and domain
 */
module.exports.returnMailgun = function() {

  try {
    return {
      key: process.env.MAILGUN_KEY,
      domain: process.env.MAILGUN_DOMAIN
    }
  } catch(err) {
    
    throw new SipiError('Mailgun: key or domain is not available in environment.');

  }

}

/**
 * Returns the password for the web API
 * @returns {string} - the password for the various endpoints
 */
module.exports.returnApiPassword = function() {

  try {

    return process.env.API_PASSWORD;

  } catch(err) {

    throw new SipiError('Api: password is not available in environment');

  }

}

/**
 * Returns the URI for the Mongo database
 */
module.exports.returnDbUri = function() {

  try {

    return process.env.MONGOLAB_URI;
  
  } catch(err) {
  
    throw new SipiError('Mongolab: database URI is not available in environment');

  } 

}

/**
 * Returns the secret for the JSON web token
 */
module.exports.returnJwtSecret = function() {

  try {

    return process.env.JWT_SECRET;

  } catch(err) {

    throw new SipiError('Json Web Token: secret is not available in environment');
    
  }
}

/**
 * Returns the base url
 */
module.exports.returnBaseUrl = function() {
  
  if (process.env.NODE_ENV === 'production') {
    return 'https://sipi-rest-api.herokuapp.com';
  } else {
    return 'http://localhost:4100';
  }
};