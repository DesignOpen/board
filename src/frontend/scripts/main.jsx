var React = require('react');
var ReactRouter = require('react-router');

var routes = require('./routes.jsx');

var container = document.querySelector('#app')
ReactRouter.run(routes, ReactRouter.HistoryLocation, function renderHandler(Handler, state) {
    React.render(<Handler params={state.params} query={state.query} />, container);
});
