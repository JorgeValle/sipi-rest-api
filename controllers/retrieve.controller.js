'use strict';

// packages
const mongoose = require('mongoose'),
      fs = require('fs'),
      request = require('request');

// services
const jsonService = require('../services/json.service'),
      environmentService = require('../services/environment.service');

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
 * Renders the sitemap data using the sitemap pug file
 * @param {*} req 
 * @param {*} res
 * @param {*} responseBody 
 */
const renderSitemap = function(req, res, responseBody) {
  res.render('sitemap', {
    documentTitle: 'Sitemap',
    canonicalUrl: `https://www.sipi.app/${req.url}`,
    // we parse JSON response to get properties ready for consumption in pug templates
    apiResponse: JSON.parse(responseBody)
  });
};

/**
 * Renders the robots text using the pug file
 * @param {*} req 
 * @param {*} res
 * @param {*} responseBody 
 */
const renderRobots = function(req, res, responseBody) {
  res.render('robots', {
    documentTitle: 'Robots'
  });
};

/**
 * Retrieves all categories
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - The JSON response, 200 if ok
 * @since 3.0.0
 */
module.exports.retrieveAllCategories = function(req, res) {

  // find and return all categories
  category.find({}).exec(function(err, categories) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, categories);
    }
  });

}

/**
 * Retrieves all cities by country id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} - The JSON response, 200 if ok
 * @since 3.0.0
 */
module.exports.retrieveCitiesByCountryId = function(req, res) {

  const countryId = req.params.countryId;

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
 * @returns {string} - The JSON string, 200 if ok
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
module.exports.retrievePageBySlug = function(req, res) {

  const pageSlug = req.params.pageSlug;

  // find page by id
  page.find({
    'content.slug': pageSlug
  }).exec(function(err, page) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else if (!page) {
     jsonService.sendResponse(res, 404, 'No such page'); 
    } else {
      jsonService.sendResponse(res, 200, page[0]);
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
    'content.name': {
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
    'content.name': {
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
  // let conditionalQuery = {
  //   'system.published': true
  // };

  place.find({}).exec(function(err, places) {
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

  console.log('retrievePlaceById ran');

  let conditionalQuery = {
    'system.id': req.params.placeId,
    // 'system.published': false
  }

  place.find(
    conditionalQuery
  ).exec(function(err, place) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      // set to first index, as we only ever return one entry from here, and it makes JSON cleaner
      jsonService.sendResponse(res, 200, place[0]);
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
 * @todo Finish the search method
 */
module.exports.retrievePlacesByTermAndLocation = function(req, res) {

  const term = req.query.q,
        location = req.query.l;

  let termIsPresent;

  if (typeof term != 'undefined' && term !== '' && term !== 'undefined') {
    termIsPresent = true;
  }

  let locationIsPresent;

  if (typeof location != 'undefined' && location !== '' && location !== 'undefined') {
    locationIsPresent = true;
  }

  let query;

  // both are present
  if (termIsPresent && locationIsPresent) {
    query = {
      $and: [
        {
          $or: [
            {
              'name': term
            },
            {
              'category.name': term
            }
          ]
        },
        {
          $or: [
            {
              'address.city': location
            },
            {
              'address.country': location
            }
          ]
        },
      ]
    };
  }
  
  // term is present
  else if (termIsPresent) {
    query = {
      $or: [
        {
          'name': term
        },
        {
          'category.name': term
        }
      ]
    };
  }
  
  // location is present
  else if (locationIsPresent) {

    console.log('location is present');
    query = {
      $or: [
        {
          'address.city': location
        },
        {
          'address.country': location
        }
      ]
    };
  }
  
  // neither are present
  else {
    query = {};
  }

  // the main query
  place
  .find(query)
  .exec(function(err, places) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 200, places);
    }
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
 * Retrieves the sitemap, destined for consumption in XML format
 * @param {*} req 
 * @param {*} res 
 */
module.exports.retrieveSitemap = function(req, res) {

  let requestOptions = {
    url: environmentService.returnBaseUrl() + '/retrieve/places',
    method: 'GET'
  };

  request(requestOptions, function(err, response, body) {

    if (err) {
      console.log('Request error' + err);
    } else {
      renderSitemap(req, res, body);
    }

  });
}

/**
 * Retrieves the robots.txt
 * @param {*} req 
 * @param {*} res 
 */
module.exports.retrieveRobots = function(req, res) {

  let requestOptions = {
    url: environmentService.returnBaseUrl() + '/retrieve/places',
    method: 'GET'
  };

  request(requestOptions, function(err, response, body) {

    if (err) {
      console.log('Request error' + err);
    } else {
      renderSitemap(req, res, body);
    }

  });
}

/**
 * Retrieves the branch locations of parent place
 */
module.exports.retrievePlacesByParentId = function(req, res) {

  let conditionalQuery = {
    'organizational.parentId': req.params.parentId,
  }

  place.find(
    conditionalQuery
  ).exec(function(err, places) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      // set to first index, as we only ever return one entry from here, and it makes JSON cleaner
      jsonService.sendResponse(res, 200, places);
    }
  });
}

/**
 * Renders the robots.txt
 */
// module.exports.renderRobots = function(req, res) {

//   res.render('robots', {
//     documentTitle: 'Sitemap',
//     canonicalUrl: `https://www.sipi.app/${req.url}`,
//     // we parse JSON response to get properties ready for consumption in pug templates
//     apiResponse: JSON.parse(responseBody)
//   });

// }