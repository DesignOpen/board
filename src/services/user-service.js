var mongoose = require('mongoose');
var User = mongoose.model('User');


function createUser(name, githubId, githubUsername) {
    var user = new User({
        name: name,
        githubId: githubId,
        githubUsername: githubUsername
    });

    return user.saveAsync();
}

function getUsers() {
    return User.findAsync({});
}

function getUserById(id) {
    return User.findOneAsync({_id: id});
}


module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    getUserById: getUserById
};
