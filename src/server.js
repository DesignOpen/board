var fs = require('fs');
var path = require('path');

var Promise = require('bluebird');
var mongoose = require('mongoose');
// Set lean option by default on
// http://mongoosejs.com/docs/api.html#query_Query-lean
// Doing this allows us to write simpler service methods.
// Otherwise each query should be called with lean option or results should be
// serialized with mongoose's .toObject() call.
// This also adds id field to returned objects, see
// https://github.com/goodeggs/mongoose-lean
var patchMongoose = require('mongoose-lean');
patchMongoose(mongoose);
Promise.promisifyAll(mongoose);

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');
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
    throw new Error('Missing environment variables');
}

// Application configuration
var config = require('./config');

// Connect to database
mongoose.connect(process.env.MONGOLAB_URI, config.mongoOptions);
mongoose.connection.on('error', function(err) {
    logger.error('Error with MongoDB connection!');
    logger.error(err + '\n');
    throw err;
});

// Bootstrap models
var modelsPath = path.join(__dirname, '/models');
fs.readdirSync(modelsPath).forEach(function(file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

var app = express();

// Set view engine to ejs
app.engine('html', require('ejs').renderFile);
// Find all node-side views inside frontend folder
app.set('views', config.serveDir);

if (process.env.NODE_ENV !== 'production') {
    // Pretty print JSON responses in development
    app.set('json spaces', 2);

    // Add request logging
    app.use(log4js.connectLogger(logger));

    // Disable caching for easier testing
    app.use(function noCache(req, res, next) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        next();
    });

    app.use(errorhandler());

    // Emulate latency in local development
    if (config.apiLatency !== null) {
        app.use(function(req, res, next) {
            if (req.path.indexOf('/api') !== -1) {
                setTimeout(next, config.apiLatency);
            } else {
                next();
            }
        });
    }
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(compression({
    // Compress everything over 10 bytes
    threshold: 10
}));

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
        process.exit(0);
    });
});

// Expose app
module.exports = app;
