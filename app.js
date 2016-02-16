var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')//,
    //indentedSyntax: true,
    //sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));



/***************************** SESSION *************************************/
var pg = require('pg') // TODO FIGURE OUT HOW TO USE THE pg-promise CONNECTION POOL
//var pg = require('pg-promise')({
//        connect: function (client) {
//            console.log('CONNECT');
//        }, disconnect: function (client) {
//            console.log('DISCONNECT');
//        }, query: function (client) {
//            console.log('QUERY');
//            console.log(client.query);
//        }, error: function (error) {
//            console.log('ERROR');
//            console.log(error);
//        }
//    })('postgres://coppers2_admin:coppers2@localhost/coppers2')
    , session = require('express-session')
    , pgSession = require('connect-pg-simple')(session);

app.use(session({
    name: 'frx$_',
    store: new pgSession({
        pg : pg,                                  // Use global pg-module
        //conString : process.env.FOO_DATABASE_URL, // Connect using something else than default DATABASE_URL env variable
        conString : 'postgres://coppers2_admin:coppers2@localhost/coppers2'//, // Connect using something else than default DATABASE_URL env variable
        //tableName : 'user_sessions'               // Use another table-name than the default "session" one
    }),
    secret: "I've seen things you people wouldn't believe",
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    rolling: false,
    //cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));


module.exports = app;
/** ***********************************************************************************/


/********************************** PASSWORDLESS LOGIN ***********************************/
var passwordless = require('passwordless');
var MemoryStore = require('passwordless-memorystore'); //TODO A MEMORY STORE PROBABLY WON'T WORK WHEN MULTIPLE PROCESSES ARE RUNNING ON THE SERVER

var Mailgun = require('mailgun-js');
var api_key = 'key-df1bd8bfd566b92bc34a428fae80d8a7';
var domain = 'over9000.net';
var from_who = 'Coppers <coppers@over9000.net>';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});

passwordless.init(new MemoryStore(), {userProperty: 'login'});
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {

        var host; // TODO BAD PASSWORDLESS! THE HOSTNAME NEEDS TO BE OBTAINED FROM THE REQUEST. YOU'RE LOSING POINTS
        if (app.get('env') === 'production') {
            host = 'over9000:9009';
        } else {
            host = 'localhost:3000';
        }
        var link = 'http://' + host + '/login?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend);

        console.log('************************************************');
        console.log('TOKEN |' + tokenToSend + '|');
        console.log('UID   |' + uidToSend + '|');
        console.log('LINK  |' + link + '|');
        console.log('************************************************');

        var data = {
            from: from_who,
            to: recipient,
            subject: 'Log in to Coppers',
            html: `Hello!\nYou can now access your account here: <a href="${link}">${link}</a>`
        };

        mailgun.messages().send(data, function (err, body) {
            if (err) {
                console.log('got an error: ', err);
            }
            callback(err);
        });
    }, {
        ttl: 15 * 60 * 1000 // token is valid for 15 min
    }
);

app.use(passwordless.sessionSupport());

/** ***********************************************************************************/

app.use('/', routes);
app.use('/api', api);
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.locals.pretty = true;

module.exports = app;
