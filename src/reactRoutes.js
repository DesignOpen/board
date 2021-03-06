// Module which runs react routes in backend

require('node-jsx').install();
var React = require('react');
var ReactRouter = require('react-router');
var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger(path.basename(__filename));

var routes = require('./frontend/scripts/routes.jsx');

function runReactRoute(req, res, next) {
    ReactRouter.run(routes, req.originalUrl, function(Handler, state) {
        _handleRouteMatch(req, res, Handler, state)
        .catch(function(err) {
            next(err);
        });
    });
}

function _handleRouteMatch(req, res, Handler, state) {
    logger.debug('Initially render', req.originalUrl);

    // Each handler component must provide a static method for fetching
    // data. The data must returned as plain JSON serializable objects
    // state.routes contains array of matched routes. The last item
    // is the innermost handler, see
    // https://github.com/rackt/react-router/issues/813
    var Component = state.routes[state.routes.length - 1].handler;

    if (!Component.fetchData) {
        // If fetch data is not provided, return null as data
        Component.fetchData = function fetchData() {
            return Promise.resolve(null);
        };
    }

    return Component.fetchData(state, req.user).then(function(data) {
        _renderPage(req, res, Handler, state, data);
    });
}

function _renderPage(req, res, Handler, state, data) {
    var initialData = {
        data: data,
        user: req.user
    };

    var handler = React.createElement(Handler, {
        params: state.params,
        query: state.query,
        data: initialData.data,
        user: initialData.user
    });

    var initialHtml = React.renderToString(handler);
    res.render('index.html', {
        initialHtml: initialHtml,
        initialData: JSON.stringify(initialData)
    });
}

module.exports = runReactRoute;
