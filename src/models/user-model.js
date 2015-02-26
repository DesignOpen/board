var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: String,
    githubId: {type: Number, unique: true},
    githubUsername: {type: String, unique: true}
});

mongoose.model('User', schema);
