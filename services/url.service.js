'use strict';

/**
 * Sluggifies the string: trimming, replacing spaces and lowercasing
 * @param {string} stringToSlug - the user object
 */
module.exports.sluggify = function(stringToSlug) {
  
  try {

    let sluggified = stringToSlug.trim().split(' ').join('-').toLowerCase();

    return sluggified;

  } catch (err) {

    console.log(`Error during sluggifying string: ${err}`);

  }

};