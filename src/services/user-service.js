var mongoose = require('mongoose');
var User = mongoose.model('User');

function createUser(newUser) {
    var user = new User(newUser);
    return user.saveAsync();
}

function getUsers() {
    return User.findAsync({});
}

function getUserById(id) {
    return User.findOneAsync({_id: id});
}

function getUserByGithubId(githubId) {
    return User.findOneAsync({githubId: githubId});
}

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    getUserById: getUserById,
    getUserByGithubId: getUserByGithubId
};
