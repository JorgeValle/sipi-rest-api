'use strict';

// packages
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      crypto = require('crypto'),
      jwt = require('jsonwebtoken');

// subdocuments
const addressSchema = require('mongoose').model('Address').schema,
      dateSchema = require('mongoose').model('Date').schema,
      imageSchema = require('mongoose').model('Image').schema;

/**
 * The schema for users
 */
let userSchema = new Schema({
  // address
  address: addressSchema,
  //auth
  auth: {
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
  },
  // date
  date: dateSchema,
  // native
  native: {
    bio: {
      type: String,
      maxLength: 150,
      default: 'Este usuario misterioso aun no ha llenado su biografia.'
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    gender: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    slug: String
  },
  // system
  system: {
    hits: {
      type: Number
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    status: {
      type: String,
      required: true,
      default: 'Active' // Options are 'Active', 'Blocked', 'Deletion Requested', 'Deleted'
    }
  },
  // notifications
  notifications: {
    unseen: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  // images
  images: [imageSchema],
  // privacy
  privacy: {
    consent: {
      type: Boolean,
      required: true
    },
    level: {
      type: String,
      required: true,
      default: 'Default'
    }
  },
  // subscription
  subscription: {
    level: {
      type: String,
      required: true,
      default: 'Default'
    }
  }
});

// for search index
userSchema.index({
  'personal.firstName': 'text',
  'personal.lastName': 'text'
});

/**
 * Sets the password for the user, after salting and hashing it
 * @param {string} password - the password that the user inputted
 */
userSchema.methods.setPassword = function(password) {
  this.auth = {
    salt: crypto.randomBytes(16).toString('hex'),
    hash: crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
  };
};

/**
 * Validates the password; used when authenticating
 * @param {string} password - the inputted password
 * @returns {string} - the now hashed password
 */
userSchema.methods.validatePassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.auth.salt, 1000, 64).toString('hex');
  return this.auth.hash === hash;
};

/**
 * Generates the JSON web token, used for tracking in the front-end
 */
userSchema.methods.generateJWT = function() {

  let expiry = new Date();
  expiry.setDate(expiry.getDate() +7);  // 7 day lifetime

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000),
  },'thisissecret');  // replace with env variable on heroku

};

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('User', userSchema, 'users');