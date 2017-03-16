/**
 * Created by yann on 2017/3/16.
 */
let express = require('express');
let mailService = require('./../services/mailService');
let async = require('async');
let router = express.Router();


/* Post to new mail. */
router.post('/', function (req, res, next) {
    mailService.sendMail({
        to: req.param('to'),
        subject: req.param('subject'),
        content: req.param('content'),
        from: req.param('from', 'notice@yannxia.info')
    });
    res.json({message: 'Get message'});
});

/***
 * Query a message status
 */
router.get('/:id', function (req, res, next) {
    const id = req.param('id');

    async.eachSeries(mailService.findOne(id),
        (mailStatus) => {
            res.json(mailStatus);
        })
});


module.exports = router;