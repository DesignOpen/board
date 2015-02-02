var postService = require('../services/post-service');


function getPosts(req, res, next) {
    
}

function post(req, res, next) {
    res.json({test: 2});
}


module.exports = {
    get: get,
    post: post
};
