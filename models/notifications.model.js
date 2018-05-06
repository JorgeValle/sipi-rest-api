'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * 
 */
let notificationSchema = new Schema({
  body: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
});

// compile schema to bson, telling mongo to use 'notifications' collection
mongoose.model('Notification', notificationSchema, 'notifications');