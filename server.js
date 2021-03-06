var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var sessionSecret = 'this is a secret secret';

if (process.env.SESSION_SECRET) {
    sessionSecret = process.env.SESSION_SECRET;
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString =
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
console.log(connectionString);

// connect to the database
var db = mongoose.connect(connectionString);
//require('./public/assignment/server/app.js')(app, mongoose, db);
require('./public/project/server/app.js')(app, db, mongoose);

app.listen(port, ipaddress);


