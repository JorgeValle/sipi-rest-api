'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema;

/**
 * The schema for cities
 */
let citySchema = new Schema({
  // date
  date: dateSchema,
  // content
  content: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  // system
  system: {
    countryId: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true,
      unique: true
    }
  }
});

citySchema.index({
  'native.name': 'text'
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('City', citySchema, 'cities');