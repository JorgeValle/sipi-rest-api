'use strict';

// packages
const mongoose = require('mongoose'),
      fs = require('fs');

// services
const jsonService = require('../services/json.service');

// models
const category = mongoose.model('Category'),
      categoryFilter = mongoose.model('CategoryFilter'),
      city = mongoose.model('City'),
      country = mongoose.model('Country'),
      notification = mongoose.model('Notification'),
      page = mongoose.model('Page'),
      place = mongoose.model('Place'),
      subcategory = mongoose.model('Subcategory'),
      user = mongoose.model('User');

/**
 * Retrieves all categories
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveAllCategories = function(req, res) {

  // find all categories and return them
  category.find({}).exec(function(err, categories) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, categories);
    }
  });

}

/**
 * Retrieves category filters by category id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveCategoryFilters = function(req, res) {

  let categoryId = req.params.categoryId;

  // find all subcategories and return them
  categoryFilter.find({}).exec(function(err, categoryFilters) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, categoryFilters);
    }
  });


}

/**
 * Retrieves all cities by country id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveCitiesByCountryId = function(req, res) {

  let countryId = req.params.countryId;

  // find all cities that match the country id, and return them
  city.find({
    'system.countryId': countryId
  }).exec(function(err, cities) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, cities);
    }
  });

}

/**
 * Retrieves all countries
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveAllCountries = function(req, res) {

  // find all countries and return them
  country.find({}).exec(function(err, countries) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, countries);
    }
  });

}

/**
 * Retrieves specific page by id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} page - If found, the page we want
 */
module.exports.retrievePageById = function(req, res) {

  let pageId = req.params.pageId;

  page.find({
    'system.id': pageId
  }).exec(function(err, page) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, page);
    }
  });

}

/**
 * Retrieves all locations
 * @todo Make this also search in countries
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} places - The collection of all places
 */
module.exports.retrieveLocationsByTerm = function(req, res) {

  let term = req.params.term;

  // return only if published
  let conditionalQuery = {
    'native.name': {
      $regex: term,
      $options: 'i'
    }
  };

  city
  .find(conditionalQuery)
  .exec(function(err, locations) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, locations);
    }
  });

}

/**
 * Retrieves all places
 * @todo Make this also search in categories and subcategories
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} places - The collection of all places
 */
module.exports.retrievePlacesByTerm = function(req, res) {

  let term = req.params.term;

  // return only if published
  let conditionalQuery = {
    'native.name': {
      $regex: term,
      $options: 'i'
    }
  };

  place
  .find(conditionalQuery)
  .exec(function(err, places) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, places);
    }
  });

}


/**
 * Retrieves all published places
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} places - The collection of all places
 */
module.exports.retrieveAllPlaces = function(req, res) {

  // return only if published
  let conditionalQuery = {
    'system.published': true
  };

  place.find(conditionalQuery).exec(function(err, places) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, places);
    }
  });

}

/**
 * Retrieves all places by owner id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} places - The collection of all places that match the owner
 */
module.exports.retrievePlacesByOwnerId = function(req, res) {

  let ownerId = req.params.ownerId;

  place.find({
    'system.ownerId': ownerId
  }).exec(function(err, places) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, places);
    }
  });

}

/**
 * Retrieves specific place by id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} place - The wanted place
 */
module.exports.retrievePlaceById = function(req, res) {

  let conditionalQuery = {
    'system.id': req.params.placeId,
    'system.published': false
  }

  place.find({
    conditionalQuery
  }).exec(function(err, place) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, place);
    }
  });

}

/**
 * Retrieves number of places in a given category, by country or city
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @returns {number} - the number of places in the given category
 */
module.exports.retrievePlacesByCategory = function(req, res) {


}

/**
 * Retrieves places by location and search term; used by main search function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrievePlacesByTermAndLocation = function(req, res) {

  let term = req.query.q;
  let location = req.query.l;
  let sortPredicate = req.query.s;

  // this query has to be constructred dynamically in a fairly sophisticated fashion

  // constructing the query dynamically
  let query = {};
  if (term != undefined && location != undefined) {
    // Will I need to search for name in here? If it matches on the name, the auto suggest click should take you directly to the listing profile
    // query.name = term;
    query['category.name'] = term;
  } else if (term != undefined) {

  } else if (location != undefined) {
    query['address.city'] = location;
    query['address.country'] = location;
    // It should match on city and/or country
    // query['address.country'] = location;
  }

  // set default base sort predicate
  if (sortPredicate == undefined) {
    sortPredicate = 'Rating';
  }

  place
  // .find( { $or: [ query ] } )
  .find( { $or:[ {'name': term}, {'category.name': term}, {'address.city': location}, {'address.country': location} ]} )
  .sort(sortPredicate)
  .exec(function(err, places) {
    jsonService.sendResponse(res, 200, places);
  });

}

/**
 * Retrieves all places in a country; used by main search function, when only a country is selected
 */
module.exports.retrievePlacesByCountry = function(req, res) {

  let country = req.params.countryName;

  place.find({
    'address.country': country
  }).exec(function(err, places) {
    jsonService.sendResponse(res, 200, places);
  });

}

/**
 * Retrieves all places in a city; used by main search function, when only a city is selected
 */
module.exports.retrievePlacesByCity = function(req, res) {

  let city = req.params.cityName;

  console.log(`City search for was ${city}`);

  place.find({
    'address.city': city
  }).exec(function(err, places) {
    jsonService.sendResponse(res, 200, places);
  });

}

/**
 * Retrieves all users
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveAllUsers = function(req, res) {

  user.find({}).exec(function(err, users) {
    jsonService.sendResponse(res, 200, users);
  });

}

module.exports.retrieveLatestUserId = function(req, res) {

}

/**
 * Retrieves specific user by id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 */
module.exports.retrieveUserById = function(req, res) {

  let userId = req.params.id;

  user.find({
    'id': userId
  }).exec(function(err, user) {
    jsonService.sendResponse(res, 200, user);
  });

}

/**
 * Retrieves all user activity, by id
 * @todo Figure out how this will work
 */
module.exports.retrieveUserNotifications = function(req, res) {

  let userId = req.params.id;

  notification.find({
    'userId': userId
  }).exec(function(err, notification) {
    jsonService.sendResponse(res, 200, notification);
  });

}

/**
 * Polls user for updates, by id
 */
module.exports.pollUser = function(req, res) {

  let userId = req.params.id;

  user.find({
    'system.id': userId
  }).exec(function(err, user) {
    jsonService.sendResponse(res, 200, user);
  });

}