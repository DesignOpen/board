var _ = require('lodash');
var mongoose = require('mongoose');
var userService = require('./user-service');
var Post = mongoose.model('Post');


function createPost(user, postJson) {
    var newPost = _.extend(postJson, {
        author: user._id
    });
    var post = new Post(newPost);

    return post.saveAsync();
}

function getPosts() {
    return Post.find({}).populate('author').execAsync();
}

function getPostById(id) {
    return Post.findById(id).populate('author').execAsync();
}

function deletePostById(id) {
    return Post.findByIdAndRemoveAsync(id);
}

function updatePostById(id, name) {
    return Post.findByIdAndUpdate(id, {name: name}).populate('author').execAsync();
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
