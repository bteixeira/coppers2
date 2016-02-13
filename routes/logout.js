var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

router.all('/',

    passwordless.logout(),
    function (req, res) {
        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    }

);

module.exports = router;
