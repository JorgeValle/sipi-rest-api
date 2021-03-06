'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const addressSchema = require('mongoose').model('Address').schema,
      coordinatesSchema = require('mongoose').model('Coordinates').schema,
      dateSchema = require('mongoose').model('Date').schema,
      hoursSchema = require('mongoose').model('Hours').schema,
      imageSchema = require('mongoose').model('Image').schema,
      organizationalSchema = require('mongoose').model('Organizational').schema;

/**
 * The schema for a place
 */
let placeSchema = new Schema({
  // address
  address: addressSchema,
  // organizational
  organizational: organizationalSchema,
  // categories
  category: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    subcats: {
      type: [String]
    }
  },
  // date
  date: dateSchema,
  // content
  content: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: String,
  },
  // contact
  contact: {
    website: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: Number
    }
  },
  // operating hours
  hours: hoursSchema,
  // system
  system: {
    id: {
      type: Number,
      required: true,
      unique: true
    }
  }
});

// indexing the fields to be used for search
placeSchema.index({
  'content.name': 'text'
});

// compile schema to bson, telling mongo to use 'places' collection
mongoose.model('Place', placeSchema, 'places');