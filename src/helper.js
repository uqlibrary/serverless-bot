/**
 * Created by jwwisgerhof on 2/07/2016.
 */
var token = 'HaiZcLiW3ECJqPfgAgSxUAFe';

module.exports = {
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
      timestamp: data.timestamp,
      username: data.user_name,
      arguments: data.text.split(' ')
    }
  }
};