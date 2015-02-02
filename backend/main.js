var fs = require('fs');
var path = require('path');

var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorhandler = require('errorhandler');

if (!process.env.MONGOLAB_URI) {
    console.error('Environment variables not set!');
    console.error('In local development, use command:');
    console.error('\n    source local-env.sh\n');
    console.error('before starting the server.');
    process.exit(1);
}

// Application configuration
var config = require('./config');

// Connect to database
var db = mongoose.connect(process.env.MONGOLAB_URI, config.mongoOptions);

// Bootstrap models
var modelsPath = path.join(__dirname, '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

var app = express();
app.set('json spaces', 2);

var nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        next();
    });

    app.use(errorhandler());
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));

// Initialize routes. This must be done after models are registered
// for mongoose
var routes = require('./routes');
routes.initRoutes(app);

// Start server
var port = process.env.PORT;
var server = app.listen(port || 80, function() {
    console.log(
        'Express server listening on port %d in %s mode',
        port,
        app.get('env')
    );
});

// Handle SIGTERM gracefully. Heroku will send this before idle.
process.on('SIGTERM', function() {
    console.log('SIGTERM received');
    console.log('Close express server');
    server.close(function() {
        console.log('Close mongodb connection');
        mongoose.disconnect();
    });
});

// Expose app
module.exports = app;
