var ajax = require('../utils/ajax.jsx').ajax;

function createPost(newPost) {
    return ajax('/api/posts', {
        method: 'post',
        data: newPost
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
