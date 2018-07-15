'use strict';

/**
 * Replaces accented characters with non-accented
 * @todo Find out why this doesn't work with "Parque Zoológico Nacional Simón Bolívar"
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

    let sluggified = str.trim().split(' ').join('-').toLowerCase(); // we replace spaces with dashes, and lowercase

    sluggified = sluggified.replace("'", ""); // we replace single quotes with nothing
 
    sluggified = replaceDiacritics(sluggified); // and also replace diacritics

    return sluggified;

  } catch(err) {

    console.log(`Error during sluggifying string: ${err}`);

  }

};

/**
 * Reverses the sluggification process
 */
module.exports.desluggify = function(str) {

  try {

    let desluggified = str.replace

  } catch(err) {

  }

}

/**
 * Unencodes URLS, replacing plus signs fro spaces
 */
module.exports.unencode = function(str) {

  try {

    return str.replace('+', ' ');

  } catch(err) {

    console.log('Something went wrong with the deserialize method on the url service');

  }


}