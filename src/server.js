var fs = require('fs');
var path = require('path');

var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var passportGithub = require('passport-github');
var GitHubStrategy = passportGithub.Strategy;

var errorhandler = require('errorhandler');
var log4js = require('log4js');


var logger = log4js.getLogger(path.basename(__filename));
if (process.env.NODE_ENV === 'production') {
    // Disable colors in production
    log4js.configure({
        appenders: [{type: 'console', layout: {type: 'basic' }}],
        replaceConsole: true
    });
}

if (!process.env.MONGOLAB_URI) {
    logger.error('Environment variables not set!');
    logger.error('In local development, use command:');
    logger.error('\n    source local-env.sh\n');
    logger.error('before starting the server.');
    process.exit(1);
}

// Application configuration
var config = require('./config');

// Connect to database
mongoose.connect(process.env.MONGOLAB_URI, config.mongoOptions);

// Bootstrap models
var modelsPath = path.join(__dirname, '/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

// Use Github strategy with passport

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:"+(process.env.PORT || 80)+"/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

var app = express();
app.set('json spaces', 2);

// Add request logging
app.use(log4js.connectLogger(logger));

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

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize routes. This must be done after models are registered
// for mongoose
var routes = require('./routes');
routes.initRoutes(app);

// Start server
var port = process.env.PORT;
var server = app.listen(port || 80, function() {
    logger.info(
        'Express server listening on port %d in %s mode',
        port,
        app.get('env')
    );
});

// Handle SIGTERM gracefully. Heroku will send this before idle.
process.on('SIGTERM', function() {
    logger.info('SIGTERM received');
    logger.info('Close express server');
    server.close(function() {
        logger.info('Close mongodb connection');
        mongoose.disconnect();
    });
});

// Expose app
module.exports = app;
