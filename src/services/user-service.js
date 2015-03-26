var mongoose = require('mongoose');
var User = mongoose.model('User');

function createUser(user) {
    var user = new User(user);
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
