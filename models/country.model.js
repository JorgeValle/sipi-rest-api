'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema;

/**
 * The schema for countries
 */
let countrySchema = new Schema({
  // date
  date: dateSchema,
  // native
  content: {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  // system
  system: {
    id: {
      type: Number,
      required: true,
      unique: true
    }
  }
});

// setting the property indexed for search
countrySchema.index({
  'content.name': 'text'
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('Country', countrySchema, 'countries');