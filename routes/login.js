var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function (req, res) {
    // TODO set cookie
    console.log(req.body.email);
    res.redirect('/main');
});

module.exports = router;
