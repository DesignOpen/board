var express = require('express');
var passport = require('passport');

var postController = require('./controllers/post-controller');
var userController = require('./controllers/user-controller');
var sessionController = require('./controllers/session-controller');
var categoryController = require('./controllers/category-controller');
var config = require('./config');
var runReactRoute = require('./reactRoutes.js');

function initRoutes(app) {
    app.get('/api/posts', postController.getPosts);
    app.post('/api/posts', postController.postPost);
    app.get('/api/posts/:id', postController.getPostById);
    app.delete('/api/posts/:id', postController.deletePostById);
    app.put('/api/posts/:id', postController.putPostById);

    app.get('/api/users', userController.getUsers);
    app.post('/api/users', userController.postUser);
    app.get('/api/users/:id', userController.getUserById);
    app.get('/api/users/:id/avatar', userController.getUserAvatarById);

    app.get('/api/categories', categoryController.getCategories);
    app.post('/api/categories', categoryController.postCategory);
    app.get('/api/categories/:id', categoryController.getCategoryById);
    app.delete('/api/categories/:id', categoryController.deleteCategoryById);
    app.put('/api/categories/:id', categoryController.putCategoryById);

    app.delete('/api/session', sessionController.deleteSession);

    // Routes for GitHub authentication
    // For convenience, these routes do not follow REST as well as the other
    // routes.
    app.get('/api/session', sessionController.getSession);
    app.get('/api/session/create', passport.authenticate('github'));
    app.get('/api/session/delete', sessionController.deleteSession);
    app.get(
        '/api/session/callback/github',
        passport.authenticate('github', { failureRedirect: '/' }),
        sessionController.githubCallback
    );

    app.use('/', express.static(config.serveDir, {
        // We don't want that / would serve /index.html, because that is
        // handled in the all-catching route
        index: false
    }));

    // Everything else will be handled to react router
    app.use('*', runReactRoute);
}

module.exports = {
    initRoutes: initRoutes
};
