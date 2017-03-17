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

    let endStr = JSON.stringify(postData);
    console.log('create class leadcloud ', endStr);

    const options = {
        hostname: HOST,
        port: PORT,
        path: CREATE_CLASSES + "mailStatus",
        method: 'POST',
        headers: {
            'X-LC-Id': process.env.LEAD_CLOUD_LC_ID,
            'X-LC-Key': process.env.LEAD_CLOUD_LC_KEY,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(endStr)
        }
    };

    let postRequest = http.request(options, (res) => {
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
    });

    postRequest.end(endStr);

};

module.exports = leancloudService;