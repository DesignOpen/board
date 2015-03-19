var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: {type: String, required: true, match: /.{1,30}/},
    description: {type: String, required: true, match: /.{1,500}/}
});

mongoose.model('Post', schema);
