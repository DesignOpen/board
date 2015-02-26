
var postService = require('./services/post-service');
var userService = require('./services/user-service');

function fetch(state) {
    // Here I would list all the possible routes and how to fetch data for them
    // I would use the router matcher instead of exact matching in real case
    if (state.path === '/posts') {
        return postService.getPosts();
    } else if (state.path === '/users') {
        return userService.getUsers();
    }

    // This would be the data what index page needs, just return posts
    // for now
    return postService.getPosts();
}

module.exports = {
    fetch: fetch
};
