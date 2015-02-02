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

}

module.exports = {
    getPosts: getPosts,
    getPostById: getPostById,
    postPost: postPost
};
