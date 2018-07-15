'use strict';

const express = require('express'),
      router = express.Router(),
      updateCtrl = require('../controllers/update.controller');

/**
 * Update endpoints
 */
router.put('/category', updateCtrl.updateCategoryById);
router.put('/categoryfilter', updateCtrl.updateCategoryFilterById);
router.put('/city', updateCtrl.updateCityById);
router.put('/country', updateCtrl.updateCountryById);
router.put('/page', updateCtrl.updatePageById);
router.put('/place', updateCtrl.updatePlaceById);
router.put('/place/location', updateCtrl.updatePlaceLocationById);
router.put('/place/amenities', updateCtrl.updatePlaceAmenitiesById);
router.put('/place/coordinates', updateCtrl.updatePlaceCoordinatesById);
router.put('/place/rating', updateCtrl.updatePlaceRatingById);
router.put('/user', updateCtrl.updateUserById);
router.put('/user/privacy', updateCtrl.updateUserPrivacy);
router.put('/user/status', updateCtrl.updateUserStatus);
router.put('/user/notifications', updateCtrl.updateUserNotifications);
router.put('/user/image', updateCtrl.updateUserImageById);

module.exports = router;  // export for use in rest of app