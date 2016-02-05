var pgpromise = require('pg-promise')({
       connect: function (client) {
        console.log('CONNECT');
    }, disconnect: function (client) {
        console.log('DISCONNECT');
    }, query: function (client) {
        console.log('QUERY');
    }, error: function (client) {
        console.log('ERROR');
    }
});
var db = pgpromise('postgres://coppers2_admin:coppers2@localhost/coppers2');
var express = require('express');
var router = express.Router();

var data = [];

router.post('/new', function(req, res) {
    console.log(req.body);

    var amount = req.body.amount;
    var date = new Date();
    var description = req.body.description;

    db.one(`
        INSERT INTO Spendings (
            id_user,
            amount,
            date,
            description
        ) VALUES (
            1,
            $1,
            $2,
            $3
        ) RETURNING ID;
    `, [amount, date, description]).then(function (data) {
        res.send({id: data.id});
    });

});

router.post('/edit', function(req, res) {
    res.send('make changes');
});

router.post('/delete', function(req, res) {
    res.send('are you sure?');
});

router.get('/search', function(req, res) {
    //res.send('send back items that match params');
    db.many('SELECT * FROM Spendings ORDER BY date ASC;', []).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;