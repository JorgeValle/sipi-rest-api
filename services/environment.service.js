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