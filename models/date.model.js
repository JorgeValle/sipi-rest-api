'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * The schema for dates, meant to be used as subdocument
 */
let dateSchema = new Schema({
  created: {
    type: Date,
    require: true
  },
  lastModified: {
    type: Date,
    required: true
  }
});

// exporting for use in other schemas
module.exports = mongoose.model('Date', dateSchema);