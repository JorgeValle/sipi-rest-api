'use strict';

/**
 * Replaces accented characters with non-accented
 */
const replaceDiacritics = function(str) {

  const replacementMap = new Map();

  replacementMap.set('a', 'á');
  replacementMap.set('e', 'é');
  replacementMap.set('i', 'í');
  replacementMap.set('o', 'ó');
  replacementMap.set('u', 'ú');
  replacementMap.set('n', 'ñ');
  replacementMap.set('u', 'ü');

  // swap out all the instances of accented characters
  replacementMap.forEach(function(item, key) {
    str = str.replace(item, key);
  });

  return str;

}

/**
 * Sluggifies the string: trimming, replacing spaces and lowercasing
 * @param {string} str - the string to sluggify
 */
module.exports.sluggify = function(str) {
  
  try {

    // prettify...
    let sluggified = str.trim().split(' ').join('-').toLowerCase();

    // and also replace diacritics
    sluggified = replaceDiacritics(sluggified);

    return sluggified;

  } catch (err) {

    console.log(`Error during sluggifying string: ${err}`);

  }

};