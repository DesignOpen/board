var postService = require('../services/post-service');
var userService = require('../services/user-service');

function getPosts(req, res, next) {
    postService.getPosts()
    .then(function(posts) {
        res.json(posts);
    })
    .catch(next);
}

function getPostById(req, res, next) {
    postService.getPostById(req.params.id)
    .then(function(post) {
        res.json(post);
    })
    .catch(next);
}

function postPost(req, res, next) {
    return userService.findById(req.user.id)
    .then(function(user) {
        if (!user) {
            var err = new Error('User could not be found.')
            err.status = 400
            throw err;
        }

        return postService.createPost(user, req.body);
    })
    .then(function(post) {
        return res.json(post);
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
