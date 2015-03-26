var mongoose = require('mongoose');
var utils = require('../utils');

var schema = utils.createSchema({
    name: {type: String, required: true, match: /.{1,30}/},
    description: {type: String, required: true, match: /.{1,500}/},
    content: {type: String, required: true, match: /.{1,5000}/}
});

mongoose.model('Post', schema);
