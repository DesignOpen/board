var dispatcher = require('../dispatcher.jsx');

var ACTIONS = Object.freeze({
    CREATE_POST: 0
});

function createPost(post) {
    dispatcher.dispatch({
        type: ACTIONS.CREATE_MESSAGE,
        post: post
    });
}

module.exports = {
    createPost: createPost,
    ACTIONS: ACTIONS
};
