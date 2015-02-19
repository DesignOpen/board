var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;


var App = React.createClass({

    render: function render() {
        return <RouteHandler params={this.props.params} query={this.props.query} />;
    },

    _isLogged: function _isLogged() {
        return false;
    }
});

module.exports = App;
