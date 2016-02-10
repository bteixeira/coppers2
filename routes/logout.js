var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
    req.session.cookie.maxAge = 0; // TODO THIS IS NOT WORKING, FIGURE OUT HOW TO REALLY GET RID OF THE COOKIE
    req.session.destroy(function () {
        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    });
});

module.exports = router;
