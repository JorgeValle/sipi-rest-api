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
      country = mongoose.model('Country'),
      city = mongoose.model('City'),
      notification = mongoose.model('Notification'),
      page = mongoose.model('Page'),
      place = mongoose.model('Place'),
      subcategory = mongoose.model('Subcategory'),
      user = mongoose.model('User');

/**
 * Creates a category after we have queried latest count
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} newCategory - The new category we want to create
 * @returns {object} - If successful, will return the newly created category; if unsuccesful, returns the error object - both in JSON format
 */
module.exports.createCategory = function(req, res) {

  // once we have count, we save
  let categoryCount = category.count({}, function(err, numberOfEntries) {

    var newCategory = new category({
      native: {
        name: req.body.name,
        slug: urlService.sluggify(req.body.name),
        summary: req.body.summary
      },
      system: {
        id: databaseService.increaseByOne(numberOfEntries),
        iconId: req.body.iconId
      }
    });

    // save the city to the database, if all goes well
    newCategory.save(function(err, newCategory) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newCategory);
      }
    });

  });

}

/**
 * Creates a country after we have queried latest count
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - The error object, when present
 * @returns {object} - If successful, will return the newly created country; if unsucessful, returns the error object - both in JSON format
 */
module.exports.createCountry = function(req, res) {

  // once we have count, we save
  let countryCount = country.count({}, function(err, numberOfEntries) {

    var newCountry = new country({
      native: {
        name: req.body.name,
        slug: urlService.sluggify(req.body.name)
      },
      system: {
        id: databaseService.increaseByOne(numberOfEntries)
      }
    });
  
    // save the country to the database, if all goes well
    newCountry.save(function(err, newCountry) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newCountry);
      }
    });


  });

}

/**
 * Creates a city
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} newCity - The new city we want to create
 * @returns {object} - If successful, will return the newly created city; if not, the error response - both in JSON format
 */
module.exports.createCity = function(req, res) {

  // once we have count, we save
  let cityCount = city.count({}, function(err, numberOfEntries) {

    var newCity = new city({
      native: {
        name: req.body.name,
        slug: urlService.sluggify(req.body.name)
      },
      system: {
        countryId: req.body.countryId,
        id: databaseService.increaseByOne(numberOfEntries)
      }
    });

    // save the city to the database, if all goes well
    newCity.save(function(err, newCity) {

      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newCity);
      }

    });

  });

}

/**
 * Creates a page
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - If present, the error object
 * @param {object} newPage - The new page we want to create
 * @returns {object} - If successful, will return the newly created page; if not, the error response - both in JSON format
 */
module.exports.createPage = function(req, res) {

  // once we have count, we save
  let pageCount = page.count({}, function(err, numberOfEntries) {

    var newPage = new page({
      native: {
        title: req.body.title,
        body: req.body.body,
        slug: urlService.sluggify(req.body.title)
      },
      system: {
        id: databaseService.increaseByOne(numberOfEntries)
      }

    });

    newPage.save(function(err, newPage) {

      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newPage);
      }

    });

  });

}

/**
 * Creates a place
 * @todo Implement the id and ownerId properties correctly
 * @todo Implement get user correctly
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} err - The error object, if present
 * @param {object} newPlace - The new place object that we want to save
 * @returns {object} If successful, will return the newly created place; if unsucessful, wil return error object, both in JSON format
 */
module.exports.createPlace = function(req, res) {

  // once we have count, we save
  let placeCount = place.count({}, function(err, numberOfEntries) {

    let getUser = function() {
      return 12;
    };

    var newPlace = new place({
      native: {
        name: req.body.name,
        slug: urlService.sluggify(req.body.name)
      },
      category: {
        name: req.body.category
      },
      system: {
        id: databaseService.increaseByOne(numberOfEntries),
        ownerId: getUser()
      }
    });

    // save the place to the database, if all goes well
    newPlace.save(function(err, newPlace) {

      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newPlace);
      }

    });

  });

}

/**
 * Creates a subcategory
 * @todo Finish implementing this
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - if successful, will return the newly created category, in JSON format
 */
module.exports.createSubcategory = function(req, res) {

  // once we have count, we save
  let subcategoryCount = subcategory.count({}, function(err, numberOfEntries) {

    var newSubcategory = new subcategory({
      native: {
        name: req.body.name
      },
      system: {
        id: databaseService.increaseByOne(numberOfEntries),
        parentId: req.body.parentId
      }
    });

    // save the final document to the database
    newSubcategory.save(function(err, newSubcategory) {
      if (err) {
        jsonService.sendResponse(res, 400, err);
      } else {
        jsonService.sendResponse(res, 201, newSubcategory);
      }
    });

  });

}

/**
 * Creates a notification
 * @todo Finish implementing this
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - if successful, will return the newly created category, in JSON format
 */
module.exports.createNotification = function(req, res) {

  var newNotification = new notification({
    body: req.body.name,
    id: databaseService.increaseByOne(numberOfEntries),
    message: req.body.message,
    status: req.body.status,
    type: req.body.type,
    title: req.body.title,
    userId: req.body.userId
  });

  // save the final document to the database
  newNotification.save(function(err, newNotification) {
    if (err) {
      jsonService.sendResponse(res, 400, err);
    } else {
      jsonService.sendResponse(res, 201, newNotification);
    }
  });

}

/**
 * Uploads user's profile photo
 */
module.exports.uploadProfilePhoto = function(req, res) {

  console.log('File upload ran');

  console.log(req);

}