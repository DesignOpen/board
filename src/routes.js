var postController = require('./controllers/post-controller');
var userController = require('./controllers/user-controller');
var categoryController = require('./controllers/category-controller');

var userService = require('./services/user-service');

var passport = require('passport');

function initRoutes(app) {
    app.get('/', function(req, res) {
        res.json({test: 1});
    });

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

    // Routes for GitHub authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get(
        '/auth/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            // Try to add new user
            userService.createUser('Unnamed User', 'user', req.user.id, req.user.username)
            .catch(function(err){
                // User already exists
            });

            res.redirect('/');
        }
    );
    app.get('/whoami', function(req, res){
        res.json(req.user);
    });
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

}

module.exports = {
    initRoutes: initRoutes
};
