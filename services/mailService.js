/**
 * Created by yann on 2017/3/16.
 */

"use strict";

let http = require('http');
let queryString = require('querystring');
let logger = require('morgan');

let mailService = {};

mailService.findOne = function (id) {
    return {status: 'OK'}
};

mailService.sendMail = function (param) {

    let postData = queryString.stringify({
        apiUser: process.env.SEND_CLOUD_API_USER,
        apiKey: process.env.SEND_CLOUD_API_KEY,
        from: param.from,
        to: param.to,
        subject: param.subject,
        html: param.content,
    });

    console.log('send message to', postData);

    let options = {
        hostname: 'api.sendcloud.net',
        port: 80,
        path: '/apiv2/mail/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        },

    };

    let postRequest = http.request(options, (res) => {
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
    });

    postRequest.write(postData);
    postRequest.end();
};

module.exports = mailService;