var mongoose = require('mongoose');
var Post = mongoose.model('Post');


function createPost(name) {
    var post = new Post({
        name: name
    });

    post.save();
}

function getPosts() {
    return Post.findAsync({});
}


module.exports = {
    createPost: createPost,
    getPosts: getPosts
};
