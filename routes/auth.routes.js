'use strict';

// packages
const express = require('express'),
      router = express.Router(),
      jwt = require('express-jwt');

// controllers
const authCtrl = require('../controllers/auth.controller.js');

// services
const environmentService = require('../services/environment.service');

// // for auth
// let auth = jwt({
//   secret: environmentService.returnJwtSecret(),
//   userProperty: 'payload'
// });

/**
 * Authentication endpoints
 */
router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);

module.exports = router; // export for use in rest of app