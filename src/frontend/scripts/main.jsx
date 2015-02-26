var React = require('react');
var Router = require('react-router');

var routes = require('./routes.jsx');


var container = document.querySelector('#app');
var initialData = JSON.parse(document.querySelector('#initial-data').innerHTML);
Router.run(routes, Router.HistoryLocation, function renderHandler(Handler, state) {
    React.render(
        <Handler params={state.params} query={state.query} data={initialData}/>,
        container
    );
});
