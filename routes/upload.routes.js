'use strict';

const express = require('express'),
      router = express.Router(),
      multer  = require('multer'),
      upload = multer(
        { dest: 'antares_content/apps/sipi/src/assets/uploads/' }
      ),
      uploadCtrl = require('../controllers/upload.controller.js'),
      jwt = require('express-jwt');

let type = upload.single('user');

/** Creation endpoints */
router.post('/user/image', type, uploadCtrl.uploadProfilePhoto);

module.exports = router; // export for use in rest of app