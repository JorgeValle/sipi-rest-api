'use strict';

/**
 * Sluggifies the string: trimming, replacing spaces and lowercasing
 * @param {string} stringToSlug - the user object
 */
module.exports.sluggify = function(stringToSlug) {

  let sluggified = stringToSlug.trim().split(' ').join('-').toLowerCase();

  return sluggified;

};