'use strict';

// bring in modules
const express = require('express'),
      router = express.Router();

// declaring the express app
var app = express();
const mongoose = require('mongoose');
const fs = require('fs');

// bring in Antares utilities
const jsonService = require('../services/json.service'),
      environmentService = require('../services/environment.service');

const updateCtrl = require('./update.controller');

// setting the API password for local and production environments
const apiPassword = environmentService.returnApiPassword();

/**
 * Uploads user's profile photo
 */
module.exports.uploadProfilePhoto = function(req, res) {

  /** When using the "single"
  data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;

  /** The original name of the uploaded file
  stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { 

    router.put('/api/update/user/image');
    jsonService.sendResponse(res, 200, 'File uploaded');
  
  });


  // update the database reference
  //updateCtrl.updateUserImageById();
  //router.put('/api/update/user/image');
  // app.runMiddleware('/api/update/user/image',{method:'put'});


}