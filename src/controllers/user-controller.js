var userService = require('../services/user-service');
var githubService = require('../services/github-service');


function getUsers(req, res, next) {
    userService.getUsers()
    .then(function(users) {
        res.json(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {

}

function getUserAvatarById(req, res, next) {
    userService.getGithubUserById(req.params.id)
    .then(function(githubUser) {
        res.redirect(githubUser.avatar_url);
    })
    .catch(next);
}

function getUserReposById(req, res, next) {
    userService.getReposById(req.params.id)
    .then(function(repos) {
        res.json(repos);
    })
    .catch(next);
}

function postUser(req, res, next) {
    userService.createUser(req.body.name, req.body.githubAccount)
    .then(function(user) {
        req.json(user);
    })
    .catch(next);
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserAvatarById: getUserAvatarById,
    getUserReposById: getUserReposById,
    postUser: postUser
};
