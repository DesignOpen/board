var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: String
});

mongoose.model('Category', schema);
