var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if (!req.session.login) {
        return res.redirect('/login');
    }
    res.render('main', {email: req.session.login});
});

module.exports = router;
