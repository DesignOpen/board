var mongoose = require('mongoose');
var Post = mongoose.model('Post');


function createPost(name) {
    var post = new Post({
        name: name
    });

    return post.saveAsync();
}

function getPosts() {
    return Post.findAsync({});
}

function deletePostById(id){
    return Post.removeAsync({_id: id});
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    deletePostById: deletePostById
};
