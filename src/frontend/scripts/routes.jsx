var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./App.jsx');
var IndexPage = require('./pages/IndexPage.jsx');
var PostPage = require('./pages/PostPage.jsx');
var NotFoundPage = require('./pages/NotFoundPage.jsx');

var routes = (
    <Route path="/" handler={App}>
        <Route name="project" path="project/:id" handler={PostPage} />
        <DefaultRoute name="index" handler={IndexPage} />
        <NotFoundRoute handler={NotFoundPage} />
    </Route>
);

module.exports = routes;
