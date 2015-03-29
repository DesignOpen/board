var ajax = require('../frontend/scripts/utils/ajax-util.jsx').ajax;
var config = require('../config');

var githubApi = 'https://api.github.com'

function get(relativeUrl) {
    var url = _createUrl(relativeUrl);
    return ajax(url);
}

function _createUrl(relativeUrl) {
    return _addCredentials(githubApi + relativeUrl);
}

function _addCredentials(url) {
    var newUrl = url + '?client_id=' + config.githubClientId;
    newUrl += '&client_secret=' + config.githubClientSecret
    return newUrl
}

module.exports = {
    get: get
};
