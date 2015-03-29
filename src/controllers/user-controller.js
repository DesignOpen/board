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
    userService.findById(req.params.id)
    .then(function(user) {
        if (!user) {
            var err = new Error('User not found');
            err.status = 404;
            throw err;
        }

        return githubService.get('/users/' + user.githubUsername);
    })
    .then(function(githubUser) {
        res.redirect(githubUser.avatar_url);
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
    postUser: postUser
};
