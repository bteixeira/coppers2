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
var express = require('express');
var router = express.Router();

var data = [];

router.post('/new', function (req, res) {
    console.log(req.body);

    var amount = req.body.amount;
    var date = new Date();
    var description = req.body.description;

    var tags = req.body.tags;
    if (typeof tags === 'string') {
        tags = tags.split(/\s+/);
    }

    // TODO TAGS MAY BE DUPLICATED

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
        db.none(
            tags.map(function (tag) {
                return `
                    INSERT INTO Spendings_Tags (
                        id_spending,
                        tag)
                    VALUES (
                        ${data.id},
                        '${tag}'
                    );`;
            }).join('')
            , []).then(function () {
            res.send({id: data.id});
        });
    });

});

router.post('/edit', function (req, res) {
    res.send('make changes');
});

router.post('/delete', function (req, res) {
    db.none(`DELETE FROM Spendings WHERE id = $1;`, [req.body.id]).then(function () {
        res.send('ok');
    }).catch(function (err) {
        res.send(err);
    });
});

router.get('/search', function (req, res) {
    // TODO
    // TODO
    // TODO
    // TODO
    // TODO OMFG FIGURE OUT HOW TO DO THIS WITH A SQL JOIN

    console.log('REQ:', req.query);

    var q = 'SELECT * FROM Spendings ';
    var params = [];
    var first = true;
    for (var p in req.query) {
        if (req.query.hasOwnProperty(p)) {
            params.push(req.query[p]);
            if (first) {
                q += 'WHERE ';
                first = false;
            } else {
                q += 'AND ';
            }
            if (p === 'amount-min') {
                q += 'amount >= $' + params.length + ' ';
            } else if (p === 'amount-max') {
                q += 'amount <= $' + params.length + ' ';
            } else if (p === 'date-min') {
                q += 'date >= $' + params.length + ' ';
                params[params.length - 1] = new Date(params[params.length - 1]);
            } else if (p === 'date-max') {
                q += 'date <= $' + params.length + ' ';
                params[params.length - 1] = new Date(params[params.length - 1]);
            }
        }
    }

    q += 'ORDER BY date ASC;';

    db.many(q, params).then(function (spendings) {
        db.many(`SELECT * FROM Spendings_Tags;`, []).then(function (tags) {
            var byId = {};
            spendings.forEach(function (spending) {
                spending.tags = [];
                byId[spending.id] = spending;
            });

            tags.forEach(function (tag) {
                if (byId.hasOwnProperty(tag.id_spending)) {
                    byId[tag.id_spending].tags.push(tag.tag);
                }
            });
            res.send(spendings);
        }).catch(function (err) {
            res.send(err);
        });
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    });
});

module.exports = router;
