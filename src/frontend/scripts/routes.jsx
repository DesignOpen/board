var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var App = require('./components/App.jsx');
var NotFound = require('./components/NotFound.jsx');


var routes = (
  <Route path="/" handler={App}>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;
