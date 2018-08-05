'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The schema for countries
 */
let countrySchema = new Schema({
  // date
  date: dateSchema,
  // content
  content: {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    tagline: {
      type: String,
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
  },
  // image
  images: {
    featured: imageSchema
  }
});

// setting the property indexed for search
countrySchema.index({
  'content.name': 'text'
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('Country', countrySchema, 'countries');