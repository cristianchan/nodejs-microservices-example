'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const slackToken = process.env.SLACK_TOKEN;
const logLevel = 'develop';

const server = http.createServer(service);
server.listen(3000);


const  rtm =  slackClient.init(slackToken,logLevel);
rtm.start();

server.on('listening',function () {
    console.log(`Iris is listening on ${server.address().port} in ${service.get('env')} mode.`)
});