var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils = require('../utils');

var schema = utils.createSchema({
    name: {type: String, required: true, match: /.{1,30}/},
    content: {type: String, required: true, match: /.{1,5000}/},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    githubProjectId: {type: String, required: true},
    categories: {type: Array, default: []}
});

mongoose.model('Post', schema);
