'use strict';

/**
 * Sends a JSON response
 */
module.exports.sendResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}