'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema;

let reviewSchema = new Schema({
  // date properties
  date: dateSchema,
  // native
  native: {
    body: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  // system properties
  system: {
    hits: {
      type: Number
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    ownerId: {
      type: Number
    },
    published: {
      type: Boolean,
      required: true,
      default: false
    },
  },
});

// compile schema to bson, telling mongo to use 'reviews' collection
mongoose.model('Review', reviewSchema, 'reviews');