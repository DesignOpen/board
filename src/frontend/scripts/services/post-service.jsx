var request = require('../utils/ajax.jsx').request;


function createPost(newPost) {
    var req = request.post('/api/posts');
    req.send(newPost);
    return req.promise();
}

function getPosts() {
    return request.get('/api/posts').promise();
}

function getPostById(id) {
    return request.get('/api/posts/' + id).promise();
}

function deletePostById(id){
    return request.delete('/api/posts/' + id).promise();
}

function updatePostById(id, newPost) {
    var req = request.put('/api/posts/' + id);
    req.send(newPost);
    return req.promise();
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
