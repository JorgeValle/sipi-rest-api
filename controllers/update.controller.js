'use strict';

// packages
const mongoose = require('mongoose'),
      fs = require('fs');

// services
const urlService = require('../services/url.service'),
      databaseService = require('../services/database.service'),
      jsonService = require('../services/json.service'),
      environmentService = require('../services/environment.service');

// models
const category = mongoose.model('Category'),
      categoryFilter = mongoose.model('CategoryFilter'),
      city = mongoose.model('City'),
      country = mongoose.model('Country'),
      page = mongoose.model('Page'),
      place = mongoose.model('Place'),
      subcategory = mongoose.model('Subcategory'),
      user = mongoose.model('User');

/**
 * Looks up category by id, and updates it
 */
module.exports.updateCategoryById = function(req, res) {

}

/**
 * Looks up category filter by id, and updates it
 */
module.exports.updateCategoryFilterById = function(req, res) {

}

/**
 * Looks up city by id, and updates it
 */
module.exports.updateCityById = function(req, res) {

}

/**
 * Looks up country by id, and updates it
 */
module.exports.updateCountryById = function(req, res) {

}

/**
 * Looks up page by id, then updates it
 */
module.exports.updatePageById = function(req, res) {

}

/**
 * Looks up place by id, then updates it
 * @todo Refactor this, badly, and get owner id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} 
 */
module.exports.updatePlaceById = function(req, res) {

  console.log('updatePlaceById ran');

  // we need a password passed in
  if (req.body.password === environmentService.returnApiPassword()) {

    // grab all values from request object
    let placeId = req.body.placeId,
        category = req.body.category,
        categoryId = req.body.categoryId,
        subcategories = req.body.subcategories,
        city = req.body.city,
        country = req.body.country,
        street = req.body.street,
        number = req.body.number,
        website = req.body.website,
        email = req.body.email,
        phone = req.body.phone,
        isParent = req.body.isParent,
        parentId = req.body.parentId,
        parentName = req.body.parentName,
        isBranch = req.body.isBranch;

    place.findOne({
      'system.id': placeId
    }, function(err, place) {

      if (err) {
        jsonService.sendResponse(res, 400, err);
      }

      if (!place) {
        jsonService.sendResponse(res, 404, 'No such place');
      }

      // we set the updated properties, if they exist
      place.category = {
        name: category,
        id: categoryId,
        subcats: subcategories
      };

      // system
      place.system.published = true;

      // date
      place.date.modified = Date.now();

      // address
      place.address = {
        city: city,
        country: country,
        street: street,
        number: number
      };

      // contact
      place.contact = {
        email: email,
        phone: phone,
        website: website
      }

      // organanizational
      place.organizational = {
        isBranch: isBranch,
        parent: {
          id: parentId,
          name: parentName,
          slug: urlService.sluggify(parentName)
        },
        parentName: parentName,
        isParent: isParent
      }

      // finally we save the new object
      place.save(function(err, updatedPlace) {
        if (err) {
          jsonService.sendResponse(res, 400, err);
        } else {
          jsonService.sendResponse(res, 200, updatedPlace);
        }
      });
    });

  }
}

/**
 * Look up place by id, then update its amenities
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updatePlaceAmenitiesById = function(req, res) {

  let placeId = req.body.placeId;
  
  place.findOne({
    'system.id': placeId
  }, function(err, place) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    if (!place) {
      jsonService.sendResponse(res, 404);
    }

    // we update the amenities
    place.amenities = req.body.amenities;

    // finally we save the new object
    place.save(function(err, updatedPlace) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedPlace);
      }
    });

  });

  
}

/**
 * Look up place by id, then update its coordinates
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updatePlaceCoordinatesById = function(req, res) {

  let placeId = req.body.placeId;
  
  place.findOne({
    'system.id': placeId
  }, function(err, place) {
    
    if (!place) {
      jsonService.sendResponse(res, 404, 'No such place');
    }

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // we update the coordinates
    place.address.coordinates = {
      lat: req.body.lat,
      lng: req.body.lng
    }

    // finally we save the new object
    place.save(function(err, updatedPlace) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedPlace);
      }
    });

  });

}

/**
 * Look up place by id, then update its coordinates
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updatePlaceLocationById = function(req, res) {

  let placeId = req.body.placeId;
  
  place.findOne({
    'system.id': placeId
  }, function(err, place) {
    
    if (!place) {
      jsonService.sendResponse(res, 404, 'No such place');
    }

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // we update the coordinates
    place.address.coordinates = {
      lat: req.body.lat,
      lng: req.body.lng
    }

    // we update the address
    place.address.number = req.body.number;
    place.address.street = req.body.street;
    place.address.country = req.body.country;
    place.address.city = req.body.city;

    // we update the contact
    place.contact.phone = req.body.phone;
    place.contact.website = req.body.website;
    place.contact.email = req.body.email;

    // finally we save the new object
    place.save(function(err, updatedPlace) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedPlace);
      }
    });

  });

}


/**
 * Look up place by id, then update its categories and subcategories
 * @param {object} req - The request object 
 * @param {object} res - The response object 
 */
module.exports.updatePlaceCategoryById = function(req, res) {

  let placeId = req.body.placeId;
  
  place.findOne({
    id: placeId
  }, function(err, place) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // we update the coordinates
    place.category = req.body.category;
    place.subcategories = req.body.subcategories;

    // finally we save the new object
    place.save(function(err, updatedPlace) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedPlace);
      }
    });

  });

}

/**
 * Look up place by id, then update its ratings
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updatePlaceRatingById = function(req, res) {

  let placeId = req.body.placeId;
  
  place.findOne({
    id: placeId
  }, function(err, place) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // we update the rating
    place.rating = req.body.rating;

    // finally we save the new object
    place.save(function(err, updatedPlace) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedPlace);
      }
    });

  });

}

/**
 * Looks up user by id, and updates it
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updateUserById = function(req, res) {

  let userId = req.body.userId;
  
  user.findOne({
    id: userId
  }, function(err, user) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // we update the user object
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.bio = req.body.bio;
    user.currentCountry = req.body.country;
    user.currentCity = req.body.city;

    // finally we save the new object
    user.save(function(err, updatedUser) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedUser);
      }
    });

  });

}

/**
 * Looks up user by id, and updates their privacy preferences
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updateUserPrivacy = function(req, res) {

  let userId = req.body.userId;
  
  user.findOne({
    id: userId
  }, function(err, foundUser) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // update the privacy level
    foundUser.privacy = {
      level: req.body.privacyLevel
    };

    // finally we save the new object
    foundUser.save(function(err, updatedUser) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedUser);
      }
    });


  });

}

/**
 * Looks up user by id, and updates their status
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updateUserStatus = function(req, res) {

  let userId = req.body.userId;
  
  user.findOne({
    id: userId
  }, function(err, foundUser) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    // update the status
    foundUser.status = req.body.status;

    // finally we save the new object
    foundUser.save(function(err, updatedUser) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedUser);
      }
    });


  });

}

/**
 * Looks up user by id, and updates their notifications
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updateUserNotifications = function(req, res) {

  let userId = req.body.userId;
  
  user.findOne({
    id: userId
  }, function(err, foundUser) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    if (!place) {
      jsonService.sendResponse(res, 404);
    }

    console.log(req.body.notifications);
    // update the status
    foundUser.notifications = {
      unseen: req.body.notifications.unseen,
      total: req.body.notifications.total
    };

    // finally we save the new object
    foundUser.save(function(err, updatedUser) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedUser);
      }
    });


  });

}

/**
 * Looks up user by id, and updates their notifications
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
module.exports.updateUserImageById = function(req, res) {

  console.log('updateUserImageById() was triggered');

  let userId = 809;
  // let image = req.body.imageFileName;
  
  user.findOne({
    id: userId
  }, function(err, foundUser) {

    if (err) {
      jsonService.sendResponse(res, 400, err);
    }

    foundUser.imageFileName = `http://via.placeholder.com/500x500`;
    // foundUser.imageFileName = `http://localhost:4200/assets/uploads/31936894263f540303dcd2f25db3664b.jpg`;

    // finally we save the new object
    foundUser.save(function(err, updatedUser) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 200, updatedUser);
      }
    });


  });

}