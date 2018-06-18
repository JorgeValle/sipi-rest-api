'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * The schema for a parent/branch relationships, meant to be used as a subdocument
 */
let organizationalSchema = new Schema({
  isBranch: {
    type: Boolean,
    required: true
  },
  parentId: Number,
  parentName: String,
  isParent: {
    type: Boolean,
    required: true
  }
});

// exporting for use in other schemas
module.exports = mongoose.model('Organizational', organizationalSchema);