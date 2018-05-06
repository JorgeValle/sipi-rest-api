'use strict';

const express = require('express'),
      router = express.Router(),
      createCtrl = require('../controllers/create.controller.js'),
      jwt = require('express-jwt');

/**
 * Creation endpoints
 */
router.post('/category', createCtrl.createCategory);
router.post('/city', createCtrl.createCity);
router.post('/country', createCtrl.createCountry);
router.post('/page', createCtrl.createPage);
router.post('/place', createCtrl.createPlace);
router.post('/subcategory', createCtrl.createSubcategory);
router.post('/notification', createCtrl.createNotification);

module.exports = router; // export for use in rest of app