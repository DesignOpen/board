var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function createPost(name) {
    var post = new Post({
        name: name
    });

    return post.saveAsync();
}

function getPosts() {
    return Post.findAsync({}).then(function(posts) {
        return posts.map(function(p) { return p.toObject(); });
    });
}

function getPostById(id) {
    return Post.findOneAsync({_id: id});
}

function deletePostById(id) {
    return Post.removeAsync({_id: id});
}

function updatePostById(id, name) {
    return Post.findOneAndUpdateAsync({_id: id}, {name: name});
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
