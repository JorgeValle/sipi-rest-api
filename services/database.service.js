'use strict';

/**
 * Increases count by one
 */
module.exports.increaseByOne = function(count) {

  return count + 1;

};

/**
 * Looks through the system ids of a determined collection, gets the highest, returns it
 */
module.exports.returnLatestId = function(collection) {

  // returns all
  return collection
  .findOne({})
  .sort({'system.id': -1}) // returns highest
  .limit(1)
  .exec(function(err, place) {

    if (err) {
      console.log('There was an error finding a free spot');
    } else {
      return place;
    }

  });

}