// Ajax utility module
// Separated to its own module to make switching to possible new ajax library
// easier
var _ = require('lodash');
var Promise = require('bluebird');
var request = require('superagent');
var Request = request.Request;

// Wrap superagent promise to bluebird
Request.prototype.promise = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        Request.prototype.end.call(self, function(err, res) {
            if (res && res.status >= 400) {
                var customErr = new Error(res.body.error.message);
                customErr.res = res;
                customErr.body = res.body;
                reject(customErr);
            } else if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

// General ajax request function.
// See superagent API documentation http://visionmedia.github.io/superagent/
//
// Parameters
// url: String, request url
// opts.method: String, HTTP method
// opts.data: Request body
// opts.headers: Object, request headers
// opts.raw: Return raw response, not just data
// Returns a promise, response code >= 400 will throw error
function ajax(url, opts) {
    opts = _.merge({
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }, opts);

    // always PUT & POST using JSON strings
    if (opts.method.toUpperCase() !== 'GET') {
        opts.headers['Content-Type'] = 'application/json; charset=UTF-8';
        opts.data = JSON.stringify(opts.data);
    }

    // superagent request methods are in format: request.post() etc.
    var requestMethod = request[opts.method.toLowerCase()];

    var promise = requestMethod(url)
        .set(opts.headers)
        .send(opts.data)
        .promise();

    if (opts.raw) {
        return promise;
    }

    return promise.then(function(response) {
        return response.body;
    });
}

module.exports = {
    ajax: ajax
};
