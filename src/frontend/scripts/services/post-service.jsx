var ajax = require('../utils/ajax-util.jsx').ajax;

function createPost(newPost) {
    return ajax('/api/posts', {
        method: 'post',
        data: newPost
    })
    .then(function(response) {
        return response[0];
    });
}

function getPosts() {
    return ajax('/api/posts');
}

function getPostById(id) {
    return ajax('/api/posts/' + id);
}

function deletePostById(id) {
    return ajax('/api/posts/' + id, {
        method: 'delete'
    });
}

function updatePostById(id, newPost) {
    return ajax('/api/posts/' + id, {
        method: 'put',
        data: newPost
    });
}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    deletePostById: deletePostById,
    updatePostById: updatePostById
};
