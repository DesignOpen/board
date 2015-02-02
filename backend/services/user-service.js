var mongoose = require('mongoose');
var User = mongoose.model('User');


function createUser(name, githubAccount) {
    var user = new User({
        name: name,
        githubAccount: githubAccount
    });

    return user.saveAsync();
}

function getUsers() {
    return User.findAsync({});
}


module.exports = {
    createUser: createUser,
    getUsers: getUsers
};
