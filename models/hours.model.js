'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let operatingHours = {
  open: String,
  close: String
};

/**
 * The schema for a operating hours, meant to be used as a subdocument
 */
let hoursSchema = new Schema({
  monday: [operatingHours],
  tuesday: [operatingHours],
  wednesday: [operatingHours],
  thursday: [operatingHours],
  friday: [operatingHours],
  saturday: [operatingHours],
  sunday: [operatingHours]
});

// exporting for use in other schemas
module.exports = mongoose.model('Hours', hoursSchema);