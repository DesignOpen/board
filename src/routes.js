var postController = require('./controllers/post-controller');
var userController = require('./controllers/user-controller');

function initRoutes(app) {
    app.get('/', function(req, res) {
        res.json({test: 1});
    });

    app.get('/api/posts', postController.getPosts);
    app.get('/api/posts/:id', postController.getPostById);
    app.post('/api/posts', postController.postPost);
    app.delete('/api/posts/:id', postController.deletePostById);

    app.get('/api/users', userController.getUsers);
    app.get('/api/users/:id', userController.getUserById);
    app.post('/api/users', userController.postUser);

}

module.exports = {
    initRoutes: initRoutes
};
