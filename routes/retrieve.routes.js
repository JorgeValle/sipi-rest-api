'use strict';

const express = require('express'),
      router = express.Router(),
      retrieveCtrl = require('../controllers/retrieve.controller');

/** Search endpoints */
// router.get('/place/:term', retrieveCtrl.retrievePlacesByTerm);
router.get('/location/:term', retrieveCtrl.retrieveLocationsByTerm);

/** Retrieve endpoints */
router.get('/categories', retrieveCtrl.retrieveAllCategories);
router.get('/categoryfilters/:categoryId', retrieveCtrl.retrieveCategoryFilters);
router.get('/cities/:countryId', retrieveCtrl.retrieveCitiesByCountryId);
router.get('/countries', retrieveCtrl.retrieveAllCountries);
router.get('/notifications/:id', retrieveCtrl.retrieveUserNotifications);
router.get('/page/:pageId', retrieveCtrl.retrievePageById);
router.get('/places', retrieveCtrl.retrieveAllPlaces);
router.get('/places/search', retrieveCtrl.retrievePlacesByTermAndLocation);
router.get('/places/country/:countryName', retrieveCtrl.retrievePlacesByCountry);
router.get('/places/city/:cityName', retrieveCtrl.retrievePlacesByCity);
router.get('/places/:ownerId', retrieveCtrl.retrievePlacesByOwnerId);
router.get('/place/:placeId', retrieveCtrl.retrievePlaceById);
router.get('/users', retrieveCtrl.retrieveAllUsers);
router.get('/user/:id', retrieveCtrl.retrieveUserById);
router.get('/user/notifications/:id', retrieveCtrl.retrieveUserNotifications);
router.get('/user/poll/:id', retrieveCtrl.pollUser);
router.get('/sitemap.xml', retrieveCtrl.retrieveSitemap);
// router.get('/robots.txt', retrieveCtrl.renderRobots);

module.exports = router;  // export for use in rest of app