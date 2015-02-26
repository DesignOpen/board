var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    category_id: String,
    name: String

});

mongoose.model('Post', schema);
