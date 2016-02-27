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

    var amount = parseFloat(req.body.amount);
    var date = new Date(req.body.date);
    var description = req.body.description;

    var tags = req.body.tags;
    if (typeof tags === 'string') {
        tags = tags.split(/\s+/);
    }
    tags = tags.map(function (tag) {
        return tag.charAt(0) === '#' ? tag.slice(1) : tag;
    });

    // TODO TAGS MAY BE DUPLICATED

    db.one(`
        INSERT INTO Spendings (
            id_user,
            amount,
            date,
            description
        ) VALUES (
            $1,
            $2::money,
            $3,
            $4
        ) RETURNING ID;
    `, [req.session.uid, amount, date, description]).then(function (data) {
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

    var select = 'Sp.*, string_agg(spt.tag, \' \') AS tags';
    var where = ['id_user = ' + pgpromise.as.number(req.session.uid)];
    var group = 'Sp.id';
    var order = 'date DESC';

    var operators = {
        'amount-min': function (val) {
            where.push(`amount >= ${pgpromise.as.number(val)}::money`);
        },
        'amount-max': function (val, i) {
            where.push(`amount <= ${pgpromise.as.number(val)}::money`);
        },
        'date-min': function (val) {
            where.push(`data >= ${pgpromise.as.date(val)}`);
        },
        'date-max': function (val) {
            where.push(`data <= ${pgpromise.as.date(val)}`);
        },
        'tags': function (val) {
            val = val.map(function (tag) {
                return 'tag = ' + pgpromise.as.text(tag);
            });
            where.push(`(${val.join(' OR ')})`);
        },
        'group': function (val) {
            if (val === 'year') {
                select = 'EXTRACT(year FROM date) AS year, SUM(amount)';
                group = 'year';
                order = 'year DESC';
            } else if (val === 'month') {
                select = 'EXTRACT(year FROM date) AS year, EXTRACT(month FROM date) AS month, SUM(amount)';
                group = 'year, month';
                order = 'year DESC, month DESC';
            } else if (val === 'week') {
                select = 'EXTRACT(year FROM date) AS year, EXTRACT(week FROM date) AS week, SUM(amount)';
                group = 'year, week';
                order = 'year DESC, week DESC';
            } else if (val === 'day') {
                select = 'EXTRACT(year FROM date) AS year, EXTRACT(month FROM date) AS month, EXTRACT (day FROM date) AS day, SUM(amount)';
                group = 'year, month, day';
                order = 'year DESC, month DESC, day DESC';
            } else if (val === 'tag') {
                select = 'tag, SUM(amount) AS sum, COUNT(*) AS count';
                group = 'tag';
                order = 'tag ASC';
            }
        }
    };
    Object.keys(req.query).forEach(function (op) {
        if (operators.hasOwnProperty(op)) {
            operators[op](req.query[op]);
        }
    });
    db.any(`
        SELECT ${select}
        FROM
            Spendings AS Sp
            INNER JOIN
            Spendings_Tags AS Spt
            ON (Sp.id = Spt.id_spending)
        WHERE ${where.join(' AND ')}
        GROUP BY ${group}
        ORDER BY ${order}
        ;
    `).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });

});

router.get('/stats/spendings', function (req, res) {
    db.one(`
        SELECT
            COUNT(1)::integer,
            MIN(amount)::numeric::float,
            MAX(amount)::numeric::float
        FROM Spendings
        WHERE id_user = $1;
    `, [req.session.uid]).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
});
router.get('/tags/all', function (req, res) {
    db.many(`
        SELECT tag, COUNT(*)
        FROM Spendings, Spendings_Tags
        WHERE tag != '' AND Spendings_Tags.id_spending = Spendings.id AND Spendings.id_user = $1
        GROUP BY tag;
    `, [req.session.uid]).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
});

module.exports = router;
