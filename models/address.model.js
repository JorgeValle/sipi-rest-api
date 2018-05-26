'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      coordinatesSchema = require('mongoose').model('Coordinates').schema;

/**
 * The schema for an address, meant to be used as a subdocument
 */
let addressSchema = new Schema({
  city: String,
  coordinates: coordinatesSchema,
  country: String,
  number: String,
  street: String,
  neighborhood: String
});

// indexing the fields to be used for search
addressSchema.index({
  city: 'text',
  country: 'text'
});

// exporting for use in other schemas
module.exports = mongoose.model('Address', addressSchema);