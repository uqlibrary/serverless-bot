/**
 * Created by jwwisgerhof on 2/07/2016.
 */
var mysql = require('mysql');

var token = 'HaiZcLiW3ECJqPfgAgSxUAFe';

module.exports = {
  _database: null,
  /**
   * Processes a request
   * @param event
   * @returns {*}
   */
  processRequest: function (event) {
    var data = event.body;

    // Check the token
    if (data.token !== token) return false;

    // Check if trigger word and text are set
    if (!data || !data.text || !data.trigger_word) return false;

    data.text = data.text.substring(data.text.indexOf(' ') + 1);

    return {
      command: data.trigger_word.toLowerCase(),
      text: data.text,
      channel: data.channel_name,
      timestamp: parseInt(data.timestamp * 1000),
      username: data.user_name,
      arguments: data.text.split(' ')
    }
  },
  /**
   * Stores this command invocation in the DB
   * @param r
   */
  storeCommand: function (r) {
    // var data = JSON.parse(JSON.stringify(r));
    // delete data['arguments'];
    //
    // this.database().query("INSERT INTO `command_history` SET ?", data, function (err, result) {
    //   if (err) console.error(err);
    // });
  },
  /**
   * Capitalizes the word
   * @param word
   * @returns {string}
   */
  ucFirst: function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },
  /**
   * Returns a connected DB
   * @returns {Connection}
   */
  database: function () {
    // if (!this._database) {
    //   this._database = mysql.createConnection({
    //     host: 'c1s3-4m-syd.hosting-services.net.au',
    //     user: 'zytecoma_uql',
    //     password: 'Ug~ec~ZVsBHg',
    //     database: 'zytecoma_uql'
    //   });
    //   this._database.connect();
    // }
    // return this._database;
  },
  /**
   * Closes the DB connection
   */
  endDatabase: function () {
    // if (this._database) {
    //   this._database.end();
    //   this._database = null;
    // }
  }
};