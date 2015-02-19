var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: String,
    githubAccount: String
});

mongoose.model('User', schema);
