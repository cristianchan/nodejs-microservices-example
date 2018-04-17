'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const slackToken = process.env.SLACK_TOKEN;


const server = http.createServer(service);
const rtm = slackClient.init(slackToken);
rtm.start();
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));
server.on('listening', function () {
    console.log(`Iris is listening on ${server.address().port} in ${service.get('env')} mode.`);
});