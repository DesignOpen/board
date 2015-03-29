var path = require('path');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 80;
var defaultGithubCallback = 'http://127.0.0.1:' + port + '/api/session/callback/github';
var config = {
    // Absolute path to the directory which contains nodejs views and static
    // image, css and js files
    serveDir: path.join(__dirname, '../public'),

    // API latency in local development for emulating slow responses.
    // If null, latency is disabled
    // This is never applied in production
    apiLatency: null,

    // Server port
    port: port,

    // Github callback url. Depends on environment
    githubCallbackUrl: process.env.GITHUB_CALLBACK_URL || defaultGithubCallback,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};

module.exports = config;
