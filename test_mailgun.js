var Mailgun = require('mailgun-js');
var api_key = 'key-df1bd8bfd566b92bc34a428fae80d8a7';
var domain = 'over9000.net';
var from_who = 'Coppers <coppers@over9000.net>';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});

var data = {
    from: from_who,
    to: 'bteixeira666@gmail.com',
    subject: 'Log into Coppers',
    text:    'Hello!\nYou can now access your account here: /login?token=&uid='
};

mailgun.messages().send(data, function (err, body) {
    if (err) {
        console.log("got an error: ", err);
    }
    else {
    //Here "submitted.jade" is the view file for this landing page
    //We pass the variable "email" from the url parameter in an object rendered by Jade
    //res.render('submitted', { email : req.params.mail });
    console.log(body);
    }
    //callback(err);
});
