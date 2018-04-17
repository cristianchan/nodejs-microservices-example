'use strict'

const {RTMClient} = require('@slack/client');

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RTMClient(token);
    return rtm;
}
