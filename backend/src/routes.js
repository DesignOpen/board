
function initRoutes(app) {
    app.get('/', function(req, res) {
        res.json({test: 1});
    });
}

module.exports = {
    initRoutes: initRoutes
};
