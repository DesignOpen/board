// Ajax utility module
// Separated to its own module to make switching to possible new ajax library
// easier
var Promise = require('bluebird');
var request = require('superagent');
var Request = request.Request;


// Wrap superagent promise to bluebird
Request.prototype.promise = function() {
    var self = this;
    return new Promise(function(resolve, reject){
        Request.prototype.end.call(self, function(err, res) {
            if (res && res.status >= 400) {
                var customErr = new Error(res.body);
                customErr.res = res;
                reject(customErr);
            } else if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

function customRequest(/* args */) {
    return request.set({
        'Accept': 'application/json'
    });
}

module.exports = {
    request: request
};
