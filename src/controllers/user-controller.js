var userService = require('../services/user-service');


function getUsers(req, res, next) {
    userService.getUsers()
    .then(function(users) {
        res.json(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {
    userService.getUserById(req.params.id)
    .then(function(user) {
        res.json(user);
    })
    .catch(next);
}

function postUser(req, res, next) {
    userService.createUser(req.body.name, req.body.githubAccount)
    .then(function(user){
        req.json(user);
    })
    .catch(next);
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    postUser: postUser,
};
