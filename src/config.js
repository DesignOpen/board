var path = require('path');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = {
    // Absolute path to the directory which contains nodejs views and static
    // image, css and js files
    serveDir: path.join(__dirname, '../public')
};

module.exports = config;
