var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function createPost(postJson) {
    var post = new Post(postJson);

    return post.saveAsync();
}

function getPosts() {
    return Post.findAsync({});
}

function getPostById(id) {
    return Post.findByIdAsync(id);
}

function deletePostById(id) {
    return Post.findByIdAndRemoveAsync(id);
}

function updatePostById(id, name) {
    return Post.findByIdAndUpdateAsync(id, {name: name});
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
