var express = require('express');
require('node-jsx').install();
var React = require('react');
var ReactRouter = require('react-router');
var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger(path.basename(__filename));

var postController = require('./controllers/post-controller');
var userController = require('./controllers/user-controller');
var categoryController = require('./controllers/category-controller');

var config = require('./config');
var routes = require('./frontend/scripts/routes.jsx');


function initRoutes(app) {
    app.get('/api/posts', postController.getPosts);
    app.get('/api/posts/:id', postController.getPostById);
    app.post('/api/posts', postController.postPost);
    app.delete('/api/posts/:id', postController.deletePostById);
    app.put('/api/posts/:id', postController.putPostById);

    app.get('/api/users', userController.getUsers);
    app.get('/api/users/:id', userController.getUserById);
    app.post('/api/users', userController.postUser);

    app.get('/api/categories', categoryController.getCategories);
    app.get('/api/categories/:id', categoryController.getCategoryById);
    app.post('/api/categories', categoryController.postCategory);
    app.delete('/api/categories/:id', categoryController.deleteCategoryById);
    app.put('/api/categories/:id', categoryController.putCategoryById);

    app.use('/', express.static(config.serveDir, {
        // We don't want that / would serve /index.html, because that is
        // handled in the all-catching route
        index: false
    }));

    app.use('*', function(req, res) {
        ReactRouter.run(routes, req.originalUrl, function(Handler, state) {
            logger.debug('Initially render', req.originalUrl);

            // TODO: fetch data here and after that, render initial html

            var handler = React.createElement(Handler, {
                params: state.params,
                query: state.query
            });
            var initialHtml = React.renderToString(handler);

            res.render('index.html', {initialHtml: initialHtml});
        });
    });
}

module.exports = {
    initRoutes: initRoutes
};
