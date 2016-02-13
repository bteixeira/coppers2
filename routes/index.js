var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

/* GET home page. */
router.get('/',
    passwordless.restricted({
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.render('main', {email: req.login});
    }
);

module.exports = router;
