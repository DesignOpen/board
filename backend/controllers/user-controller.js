var userService = require('../services/user-service');


function getUsers(req, res, next) {
    userService.getUsers()
    .then(function(users) {
        res.json(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {

}

function postUser(req, res, next) {

}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    postUser: postUser,
};
