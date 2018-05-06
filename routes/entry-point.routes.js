'use strict';

const express = require('express'),
      router = express.Router();

// bring in all the needed routes
require('./retrieve.routes');
require('./create.routes');
require('./update.routes');
require('./delete.routes');

module.exports = router;