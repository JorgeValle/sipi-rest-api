'use strict';

const express = require('express'),
      router = express.Router(),
      deleteCtrl = require('../controllers/delete.controller');

/**
 * Endpoint for deleting a content by id
 */
router.delete('/delete/:id', deleteCtrl.deleteOneById);

module.exports = router;  // export for use in rest of app