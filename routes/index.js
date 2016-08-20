var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('welcome to api root');
});

router.use('/polls', require('./polls'));

module.exports = router;
