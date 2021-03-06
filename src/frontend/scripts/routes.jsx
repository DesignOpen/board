var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./App.jsx');
var IndexPage = require('./pages/IndexPage.jsx');
var ProjectsPage = require('./pages/ProjectsPage.jsx');
var PostPage = require('./pages/PostPage.jsx');
var NewPostPage = require('./pages/NewPostPage.jsx');
var NotFoundPage = require('./pages/NotFoundPage.jsx');

var routes = (
    <Route path="/" handler={App}>
        <Route name="post" path="post/:id/?" handler={PostPage} />
        <Route name="new-post" path="submit-project/?" handler={NewPostPage} />
        <Route name="projects" path="projects/?" handler={ProjectsPage} />
        <DefaultRoute name="index" handler={IndexPage} />
        <NotFoundRoute handler={NotFoundPage} />
    </Route>
);

module.exports = routes;
