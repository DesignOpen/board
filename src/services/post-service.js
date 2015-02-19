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

function updatePostById(id, name) {
    return Post.findOneAndUpdateAsync({_id: id}, {name: name});
}


module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
