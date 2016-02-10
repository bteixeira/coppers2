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

var files = [
    './scripts/create.sql',
    './node_modules/connect-pg-simple/table.sql'
];

function source(index, data, delay) {
    if (index >= files.length) {
        return;
    }
    var filename = files[index];
    var file = new pgpromise.QueryFile(filename, {debug: false});
    return this.query(file);
}

db.tx(function (t) {
    return this.sequence(source);
}).then(function (data) {
    console.log('\nBye bye.\n');
    pgpromise.end();
}).catch(function (error) {
    console.log(error);
    pgpromise.end();
});
