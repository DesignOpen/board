var postService = require('../services/post-service');


function getPosts(req, res, next) {
    postService.getPosts()
    .then(function(posts) {
        res.json(posts);
    })
    .catch(next);
}

function getPostById(req, res, next) {

}

function postPost(req, res, next) {
    postService.createPost(req.body.name)
    .then(function(post) {
        res.json(post);
    })
    .catch(next);
}

function deletePostById(req, res, next) {
    postService.deletePostById(req.params.id)
    .then(function(query) {
        res.json(query);
    })
    .catch(next);
}

function putPostById(req, res, next) {
    postService.updatePostById(req.params.id, req.body.name)
    .then(function(query) {
        res.json(query);
    })
    .catch(next);
}

module.exports = {
    getPosts: getPosts,
    getPostById: getPostById,
    postPost: postPost,
    deletePostById: deletePostById,
    putPostById: putPostById
};
