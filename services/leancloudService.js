/**
 * Created by yann on 2017/3/16.
 */
"use strict";

let http = require('https');
let queryString = require('querystring');

const HOST = 'leancloud.cn';
const PORT = 443;
const CREATE_CLASSES = '/1.1/classes/';

let leancloudService = {};

leancloudService.create = function (postData) {

    console.log('create class leadcloud ', postData);

    const options = {
        hostname: HOST,
        port: PORT,
        path: CREATE_CLASSES + "MailStatus",
        method: 'POST',
        headers: {
            'X-LC-Id': process.env.LEAD_CLOUD_LC_ID,
            'X-LC-Key': process.env.LEAD_CLOUD_LC_KEY,
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': Buffer.byteLength(postData)
        },

    };

    let postRequest = http.request(options, (res) => {
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
    });

    postRequest.write(queryString.stringify(postData));
    postRequest.end();
};

module.exports = leancloudService;