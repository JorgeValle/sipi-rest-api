'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The schema for pages
 */
let pageSchema = new Schema({
  // dates
  date: dateSchema,
  // content
  content: {
    title: {
      type: String,
      required: true,
      unique: true
    },
    body: {
      type: String,
      required: true
    },
    slug: String
  },
  // traffic
  traffic: {
    hits: {
      type: Number,
      default: 0
    }
  },
  // system
  system: {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    published: {
      type: Boolean,
      required: true,
      default: false
    }
  }
});

pageSchema.index({
  body: 'text',
  title: 'text'
});

// compile schema to bson, telling mongo to use 'pages' collection
mongoose.model('Page', pageSchema, 'pages');