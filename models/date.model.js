'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 *
 */
let dateSchema = new Schema({
  created: {
    type: Date,
    default: Date.now(),
    require: true
  },
  lastModified: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

// exporting for use in other schemas
module.exports = mongoose.model('Date', dateSchema);