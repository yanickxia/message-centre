/**
 * Created by yann on 2017/3/16.
 */
"use strict";

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mailService = require('./../services/mailService');

var server;

describe('mailService', function () {

    before(function () {
        server = sinon.fakeServer.create();
    });
    after(function () {
        server.restore();
    });

    it('test sendMail at once http request', function () {

        server.respondWith("POST", "/apiv2/mail/send",
            [200, {"Content-Type": "application/json"},
                '{ "stuff": "is", "awesome": "in here" }']);

        let callback = sinon.spy();
        mailService.sendMail('', '', '');
        server.respond();

        expect(callback.calledOnce);
    });
});
