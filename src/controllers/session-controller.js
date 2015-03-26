var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger(path.basename(__filename));
var userService = require('../services/user-service');

function deleteSession(req, res) {
    logger.debug('Delete session for user', req.user);
    req.logout();
    res.redirect('/');
}

function getSession(req, res) {
    res.json(req.user);
}

function githubCallback(req, res) {
    logger.debug('GitHub callback called');
    // Create a new user to our database if we don't have a record of the
    // github user
    var githubUser = req.user;
    console.log(githubUser)

    userService.getUserByGithubId(githubUser.id)
    .then(function(user) {
        if (user === null) {
            logger.debug('User does not exist, creating');

            return userService.createUser({
                name: githubUser.displayName,
                role: 'normal',
                githubId: githubUser.id,
                githubUsername: githubUser.username
            });
        }

        logger.debug('User exists', user);
        return user;
    })
    .then(function(user) {
        logger.debug('User authenticated', user);
        res.redirect('/');
    })
    .catch(function(err) {
        throw err;
    });
}

module.exports = {
    deleteSession: deleteSession,
    getSession: getSession,
    githubCallback: githubCallback
};
