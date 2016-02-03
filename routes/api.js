var express = require('express');
var router = express.Router();

var data = [];

router.post('/new', function(req, res, next) {
    var n = req.body.name;
    console.log(n);
    console.log(data);
    console.log(req.body);
    data.push(n);
    res.send({id: Math.random()});
});

router.post('/edit', function(req, res, next) {
    res.send('make changes');
});

router.post('/delete', function(req, res, next) {
    res.send('are you sure?');
});

router.get('/search', function(req, res, next) {
    res.send('send back items that match params');
});

module.exports = router;
