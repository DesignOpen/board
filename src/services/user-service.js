var mongoose = require('mongoose');
var User = mongoose.model('User');

function createUser(newUser) {
    var user = new User(newUser);
    return user.saveAsync();
}

function getUsers() {
    return User.findAsync({});
}

function findById(id) {
    return User.findOneAsync({_id: id});
}

function findByGithubId(githubId) {
    return User.findOneAsync({githubId: githubId});
}

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    findById: findById,
    findByGithubId: findByGithubId
};
