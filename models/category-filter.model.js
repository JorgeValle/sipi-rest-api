'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let categoryFilterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
});

categoryFilterSchema.index({
  name: 'text'
});

// compile schema to bson, telling mongo to use 'categoryfilters' collection
mongoose.model('CategoryFilter', categoryFilterSchema, 'categoryfilters');