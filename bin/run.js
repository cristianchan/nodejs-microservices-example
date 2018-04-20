'use strict';

const slackToken = process.env.SLACK_TOKEN;
const witToken = process.env.WIT_TOKEN;
const slackClient = require('../server/slackClient');
const witClient = require('../server/witClient')(witToken);
const service = require('../server/service');
const http = require('http');


const server = http.createServer(service);
const rtm = slackClient.init(slackToken ,witClient);


rtm.start();
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));
server.on('listening', function () {
    console.log(`Iris is listening on ${server.address().port} in ${service.get('env')} mode.`);
});