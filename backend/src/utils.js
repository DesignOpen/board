var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Helper to create schema which automatically provides created and modified
// timestamps
function createSchema(opts) {
    opts.createdAt = {type: Date};
    opts.updatedAt = {type: Date};

    var schema = new Schema(opts);

    schema.pre('save', function(next) {
        var now = new Date();
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    return schema;
}


module.exports = {
    createSchema: createSchema
};
