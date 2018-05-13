'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The schema for categories
 */
let categorySchema = new Schema({
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
    slug: {
      type: String,
      required: true,
      unique: true
    },
    summary: String
  },
  // system
  system: {
    id: {
      type: Number,
      required: true,
      unique: true
    }
  },
  // presentation
  presentation: {
    iconId: String
  }
});

// setting the property indexed for search
categorySchema.index({
  'content.name': 'text'
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('Category', categorySchema, 'categories');