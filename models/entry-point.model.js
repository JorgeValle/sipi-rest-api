'use strict';

// packages
const mongoose = require('mongoose');

// services
const environmentService = require('../services/environment.service');

const dbURI = environmentService.returnDbUri();

mongoose.connect(dbURI);

/**
 * Shuts down database connection
 * @param {*} msg 
 * @param {*} callback 
 */
let gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function () {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

mongoose.connection.on('connected', function() {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', function(err) {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.once('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.once('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

// subdocuments
require('./coordinates.model');
require('./date.model');
require('./image.model');
require('./address.model'); // not alphabetical for execution reasons
require('./organizational.model');
require('./hours.model');

// models
require('./category.model');
require('./category-filter.model');
require('./city.model');
require('./country.model');
require('./notifications.model');
require('./pages.model');
require('./places.model');
require('./replies.model');
require('./reviews.model');
require('./subcategory.model');
require('./users.model');