'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// subdocuments
const dateSchema = require('mongoose').model('Date').schema;

/**
 * The schema for replies
 */
let replySchema = new Schema({
  // date
  date: dateSchema,
  // content
  content: {
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

// compile schema to bson, telling mongo to use 'replies' collection
mongoose.model('Reply', replySchema, 'replies');