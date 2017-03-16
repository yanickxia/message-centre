/**
 * Created by yann on 2017/3/16.
 */
let express = require('express');
let mailService = require('./../services/mailService');
let async = require('async');
let router = express.Router();


/* Post to new mail. */
router.post('/', function (req, res, next) {
    let id = generateRandomId();

    mailService.sendMail({
        to: req.query.to,
        subject: req.query.subject,
        content: req.query.content,
        from: req.query.from == undefined ? 'notice@yannxia.info' : req.query.from,
        id: id
    });


    res.json({'id': id});

});

/***
 * Query a message status
 */
router.get('/:id', function (req, res, next) {
    const id = req.param('id');

    async.series(mailService.findOne(id),
        (mailStatus) => {
            res.json(mailStatus);
        })
});


function generateRandomId() {
    return Math.random().toString(36) + new Date().toISOString()
}


module.exports = router;