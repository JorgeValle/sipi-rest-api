'use strict';

// packages
const mongoose = require('mongoose'),
      fs = require('fs');

// services
const jsonService = require('../services/json.service'),
      environmentService = require('../services/environment.service');


const apiPassword = environmentService.returnApiPassword();

/**
 * Deletes one by id
 *
 *
 */
module.exports.deleteOneById = function(req, res) {

  // get the url from the router
  var wantedUrl = req.body.url;

  // if it maches local or prod environment password, go ahead
  if (req.body.password === apiPassword) {

    // find the document, and delete it
    pages.findOneAndRemove({
      'url': wantedUrl
    }, function(err, page) {
      jsonService.sendResponse(res, 200, 'Content has been deleted.');
    });

  } else {
    jsonService.sendResponse(res, 403, "Nice try, buddy.");
  }

};