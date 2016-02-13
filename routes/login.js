var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

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



router.get('/',
    passwordless.acceptToken(
    //    {
    //    successRedirect: '/'
    //}
    ), function(req, res) {
        var login = req.login;
        if (login) {
            console.log('USER IS LOGGED IN');
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
            //res.redirect('/');
        } else {
            console.log('USER IS NOT LOGGED IN');
            console.log('RENDERING LOGIN');
            res.render('login');
        }
    }
);

router.get('/', function (req, res, next) {
    console.log('DOING SOMETHING ELSE');
    next();
});

router.get('/sent', function (req, res) {
    res.render('token_sent');
});

router.post('/',

    passwordless.requestToken(function (user, delivery, callback, req) {
        callback(null, user);
    }, {userField: 'email'})

    , function (req, res) {
        res.redirect('/login/sent');
    }

    //function (req, res) {
    //    var login = req.body.email;
    //    if (login) {
    //        req.session.login = login;
    //        db.one(`SELECT * FROM Users WHERE email = $1;`, login).then(function (user) {
    //            console.log('user exists');
    //            req.session.uid = user.id;
    //            res.redirect('/');
    //        }).catch(function () {
    //            console.log('inserting new user');
    //            db.one(`INSERT INTO Users (email) VALUES ($1) RETURNING ID`, login).then(function (row) {
    //                req.session.uid = row.id;
    //                res.redirect('/');
    //            });
    //        });
    //    } else {
    //        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    //    }
    //}
);

router.all('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/login'); // TODO GET ROUTE PROGRAMMATICALLY
    });
});

module.exports = router;
