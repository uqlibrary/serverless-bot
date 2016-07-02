'use strict';

// Custom
var commands = require('./src/commands');
var helper = require('./src/helper');

// Lib
var http = require('http');

module.exports.slack = function (event, context, cb) {
  var request = helper.processRequest(event);

  // Store command into the history
  helper.storeCommand(request);

  // Throw the user out if the request is invalid
  if (request === false) cb(null, { errorMessage: 'Invalid request' });

  // Call the command. Receive a ES6 promise
  var p = commands[request.command](request);

  p.then(function (val) {
    cb(null, val);
  }).catch(function (err) {
    cb(null, err);
  });
};
