var express = require('express');
var router = express.Router();


var pgpromise = require('pg-promise')({
    connect: function (client) {
        console.log('CONNECT');
    }, disconnect: function (client) {
        console.log('DISCONNECT');
    }, query: function (client) {
        console.log('QUERY');
        console.log(client.query);
    }, error: function (error) {
        console.log('ERROR');
        console.log(error);
    }
});
var db = pgpromise('postgres://coppers2_admin:coppers2@localhost/coppers2');
// TODO WOW SUCH DUPLICATION



router.get('/', function(req, res) {
    console.log('SESSION', req.session);
    res.render('login');
});

router.post('/', function (req, res) {
    // TODO set cookie
    var login = req.body.email;
    if (login) {
        req.session.login = login;
        db.one(`SELECT * FROM Users WHERE email = $1;`, login).then(function (user) {
            console.log('user exists');
            req.session.uid = user.id;
            res.redirect('/');
        }).catch(function () {
            console.log('inserting new user');
            db.one(`INSERT INTO Users (email) VALUES ($1) RETURNING ID`, login).then(function (row) {
                req.session.uid = row.id;
                res.redirect('/');
            });
        });
    } else {
        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    }
});

router.all('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    });
});

module.exports = router;
