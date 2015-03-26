var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: String,
    role: {
        name: String,
        level: Number
    },
    githubId: {type: Number, unique: true},
    githubUsername: {type: String, unique: true}
});

mongoose.model('User', schema);
