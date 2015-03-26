var dispatcher = require('../dispatcher.jsx');
var postService = require('../services/post-service.jsx');
var actions = require('../constants.jsx').actions;

function createPost(newPost) {
    return postService.createPost(newPost)
    .then(function(post) {
        dispatcher.dispatch({
            type: actions.CREATE_POST,
            data: post
        });

        return post;
    });
}

module.exports = {
    createPost: createPost
};
