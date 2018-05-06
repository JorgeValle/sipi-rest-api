'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const addressSchema = require('mongoose').model('Address').schema,
      coordinatesSchema = require('mongoose').model('Coordinates').schema,
      dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The schema for the place
 */
let placeSchema = new Schema({
  // address
  address: addressSchema,
  // categories
  category: {
    name: {
      type: String,
      required: true
    },
    subcats: {
      type: [String]
    }
  },
  // claimed
  claimed: {
    type: Boolean,
    required: true,
    default: false
  },
  // date properties
  date: dateSchema,
  // images
  images: [imageSchema],
  // native
  native: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    slug: String,
    website: String
  },
  // reviews
  reviews: {
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    value: {
      type: Number,
      required: true,
      default: 0
    }
  },
  // system
  system: {
    hits: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    locked: {
      type: Boolean,
      required: true,
      default: false
    },
    ownerId: {
      type: Number
    },
    published: {
      type: Boolean,
      required: true,
      default: false
    }
  }
});

// indexing the fields to be used for search
placeSchema.index({
  name: 'text'
});

// compile schema to bson, telling mongo to use 'places' collection
mongoose.model('Place', placeSchema, 'places');