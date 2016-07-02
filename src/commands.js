var request = require('request');
var helper = require('./helper');

module.exports = {
  /**
   * A simple echo
   * @param request
   * @returns {*}
   */
  echo: function (request) {
    return new Promise(
      function (resolve) {
        console.log(request.text);
        resolve({ text: 'You said: ' + request.text })
      }
    );
  },
  /**
   * Returns Lambda's IP address
   * @param r
   * @returns {*}
   */
  ip: function (r) {
    return new Promise(
      function (resolve) {
        request('http://httpbin.org/get', function (error, response, body) {
          var text = '';
          if (!error && response.statusCode == 200) {
            text = '@' + r.username + ': My IP address is ' + JSON.parse(body).origin;
          } else {
            text = '@' + r.username + ': I had issues fetching my IP address. Please try again later.';
          }

          resolve({ text: text });
        });
      }
    );
  },

  /**
   * Shows a simple error message
   * @param cb
   * @param message
   * @returns {*}
   */
  error: function (cb, message) {
    return cb(null, {
      errorMessage: message
    });
  }
};