'use strict'

const {RtmClient} = require('@slack/client');
const {CLIENT_EVENTS} = require('@slack/client');
const {RTM_EVENTS} = require('@slack/client');
let rtm = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
    console.log(message);
    rtm.sendMessage('this is a test message','CA7QQ8AF3',function () {
        
    })
}

module.exports.addAuthenticatedHandler = function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token) {
    rtm = new RtmClient(token);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm
};
