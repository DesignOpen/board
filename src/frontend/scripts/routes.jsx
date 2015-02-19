var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var App = require('./components/App.jsx');
var Login = require('./components/Login.jsx');
var Index = require('./components/Index.jsx');
var Project = require('./components/Project.jsx');
var NotFound = require('./components/NotFound.jsx');


var routes = (
    <Route path="/" handler={App}>
        <Route name="login" path="login" handler={Login}/>
        <Route name="project" path="project/:id" handler={Project}/>
        <DefaultRoute name="index" handler={Index} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

module.exports = routes;
