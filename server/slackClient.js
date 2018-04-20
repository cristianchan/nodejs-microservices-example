'use strict'

const {RtmClient} = require('@slack/client');
const {CLIENT_EVENTS} = require('@slack/client');
const {RTM_EVENTS} = require('@slack/client');
let rtm = null;
let nlp = null

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {

    nlp.ask(message.text, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!res.intent) {
            return rtm.sendMessage('Sorry, I dont know you are talking about', message.channel);
        } else if (res.intent[0].value === 'time' && res.location) {
            return rtm.sendMessage('I dont yet know the time ' + res.location[0].value, message.channel);
        } else {
            return rtm.sendMessage('Sorry, I dont know you are talking about', message.channel);
        }
    })

}

module.exports.addAuthenticatedHandler = function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, nlpClient) {
    rtm = new RtmClient(token);
    nlp = nlpClient;
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm
};
