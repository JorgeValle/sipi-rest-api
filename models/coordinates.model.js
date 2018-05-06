'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * The schema for a coordinate point, meant to be used as a subdocument
 */
let coordinatesSchema = new Schema({
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
});

// exporting for use in other schemas
module.exports = mongoose.model('Coordinates', coordinatesSchema);