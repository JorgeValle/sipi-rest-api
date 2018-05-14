'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The subcategory schema
 */
let subcategorySchema = new Schema({
  // date
  date: dateSchema,
  // content
  content: {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    slug: {
      type: String
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
    parentId: {
      type: Number
    }
  }
});

subcategorySchema.index({
  'content.name': 'text'
});

// compile schema to bson, telling mongo to use 'subcategories' collection
mongoose.model('Subcategory', subcategorySchema, 'subcategories');