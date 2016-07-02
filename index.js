/**
 * This file is to be run locally for testing purposes
 *
 * Created by jwwisgerhof on 2/07/2016.
 */
var commands = require('./src/commands');
var helper = require('./src/helper');

var request = {
  username: 'jwwisgerhof',
  command: 'stats',
  text: 'stats',
  channel: 'local_test',
  timestamp: Date.now()
};

helper.storeCommand(request);

var p = commands[request.command](request);

p.then(function (data) {
  console.log(data);
}).catch(function(data) {
  console.error(data);
});