var api = require('./controllers/api');


function initRoutes(app) {
    app.get('/', function(req, res) {
        res.json({test: 1});
    });

    app.get('/api/v1/post', api.post);
}

module.exports = {
    initRoutes: initRoutes
};
