'use strict';

/**
 * Sluggify the string
 * @param {string} stringToSlug - the user object
 */
module.exports.sluggify = function(stringToSlug) {

  let sluggified = stringToSlug.split(' ').join('-');
      sluggified = sluggified.toLowerCase();

  return sluggified;

};