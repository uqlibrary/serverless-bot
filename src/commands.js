var request = require('request');
var helper = require('./helper');
var mathjs = require('mathjs');
var weather = require('city-weather');
var async = require('async');

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
   * Does math!
   * @param r
   * @returns {Promise}
   */
  math: function (r) {
    return new Promise(
      function (resolve) {
        resolve({
          text: mathjs.eval(r.text)
        });
      }
    );
  },

  /**
   * Does conversions!
   * @param r
   * @returns {Promise}
   */
  convert: function (r) {
    return new Promise(
      function (resolve, reject) {
        var result = mathjs.eval(r.text);

        if (result !== false) {
          resolve({ text: result.toString() });
        } else {
          reject({ errorMessage: 'Invalid request' });
        }
      }
    );
  },

  /**
   * Gives weather information
   * @param r
   * @returns {Promise}
   */
  weather: function (r) {
    return new Promise(
      function (resolve, reject) {
        var data = {};

        async.parallel([
          // Actual temperature
          function (callback) {
            weather.getActualTemp(r.text, function (temp) {
              data.temperature = temp;
              callback(null, temp);
            });
          },
          // Climate description (e.g. clear skies)
          function (callback) {
            weather.getClimateDescription(r.text, function (desc) {
              data.climate = desc;
              callback(null, desc);
            });
          },
          // Climate description (e.g. clear skies)
          function (callback) {
            weather.getWindSpeed(r.text, function (desc) {
              data.windSpeed = desc;
              callback(null, desc);
            });
          }
        ], function () {
          var emoji =
            ( data.climate.match( /clear/i ) )? ':sunny:'
              : ( data.climate.match( /(broken clouds)|(scattered clouds)/i ) )? ':sun_small_cloud:'
              : ( data.climate.match( /shower rain/i ) )? ':rain_cloud:'
              : ( data.climate.match( /clouds/i ) )? ':partly_sunny:'
              : ( data.climate.match( /snow/i ) )? ':snow_cloud:'
              : ( data.climate.match( /rain/i ) )? ':rain_cloud:'
              : ( data.climate.match( /mist/i ) )? ':foggy:'
              : '';

          resolve({
            text: 'Today in ' + helper.ucFirst(r.text) + ': ' + emoji + ' ' + data.climate + ' and '
              + data.temperature + '°C, wind: ' + data.windSpeed + 'm/s'
          });
        });
      }

    )
  },
  /**
   * Shows basic stats for this bot
   * @param r
   * @returns {Promise}
   */
  stats: function (r) {
    return new Promise(
      function(resolve) {
        return { text: 'Temporarily disabled until DB access is restored.' };

        // var conn = helper.database();
        // conn.query('SELECT count(id) as nr FROM `command_history`', function (err, rows, fields) {
        //   if (err) reject({});
        //
        //   resolve({
        //     text: 'I have processed a total of ' + rows[0].nr + ' commands'
        //   });
        // });
      }
    );
  }
};