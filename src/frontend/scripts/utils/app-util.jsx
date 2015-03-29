// Utility functions which depend on app specific details

var constants = require('../constants.jsx');

function apiUrl(relative) {
    return constants.apiUrl + relative;
}

module.exports = {
    apiUrl: apiUrl
};
