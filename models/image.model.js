'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * The image schema, meant to be used as subdocument
 */
let imageSchema = new Schema({
  fileName: String,
  title: String,
  caption: String,
  featured: Boolean
});

// exporting for use in other schemas
module.exports = mongoose.model('Image', imageSchema);