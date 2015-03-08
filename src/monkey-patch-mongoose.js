var mongoose = require('mongoose');

// Save original setOptions
var __setOptions = mongoose.Query.prototype.setOptions;

// Set lean option by default on
// http://mongoosejs.com/docs/api.html#query_Query-lean
// Doing this allows us to write simpler service methods.
// Otherwise each query should be called with lean option or results should be
// serialized with mongoose's .toObject() call.
mongoose.Query.prototype.setOptions = function() {
    __setOptions.apply(this, arguments);

    // If lean option is not explicitly set to false, set it to true
    if (this._mongooseOptions.lean !== false) {
        this._mongooseOptions.lean = true;
    }

    return this;
};
