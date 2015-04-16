var mongoose = require('mongoose');
var User = mongoose.model('User');
var githubService = require('./github-service');

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

function getGithubUserById(id) {
    return findById(id)
    .then(function(user) {
        if (!user) {
            var err = new Error('User not found');
            err.status = 404;
            throw err;
        }

        return githubService.get('/users/' + user.githubUsername);
    });
}

function getReposById(id) {
    return findById(id)
    .then(function(user) {
        if (!user) {
            var err = new Error('User not found');
            err.status = 404;
            throw err;
        }

        return githubService.get('/users/' + user.githubUsername + '/repos');
    });
}

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    findById: findById,
    findByGithubId: findByGithubId,
    getGithubUserById: getGithubUserById,
    getReposById: getReposById,
};
