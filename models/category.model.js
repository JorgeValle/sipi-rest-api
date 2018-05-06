'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

let categorySchema = new Schema({
  // date
  date: dateSchema,
  // native
  native: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    summary: String
  },
  // system
  system: {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    iconId: String,
    listings: {
      type: Number,
      default: 0
    }
  }
});

// setting the property indexed for search
categorySchema.index({
  name: 'text'
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('Category', categorySchema, 'categories');