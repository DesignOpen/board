var React = require('react');
var Router = require('react-router');

var routes = require('./routes.jsx');

var container = document.querySelector('#app');
var initialData = JSON.parse(document.querySelector('#initial-data').innerHTML);

Router.run(routes, Router.HistoryLocation, function renderHandler(Handler, state) {
    // state.routes contains array of matched routes. The last item
    // is the innermost handler, see
    // https://github.com/rackt/react-router/issues/813
    var Component = state.routes[state.routes.length - 1].handler;
    React.render(
        <Handler
            PageComponent={Component}
            params={state.params}
            query={state.query}
            data={initialData}/>,
        container
    );
});
