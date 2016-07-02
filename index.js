/**
 * Created by jwwisgerhof on 2/07/2016.
 */
var c = require('./src/commands');

var p = c.ip({
  username: 'jwwisgerhof'
});

p.then(function (data) {
  console.log(data);
});