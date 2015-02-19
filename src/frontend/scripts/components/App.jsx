var React = require('react');


var App = React.createClass({

    render: function render() {
        return <h1>App</h1>;
    },

    _isLogged: function _isLogged() {
        return false;
    }
});

module.exports = App;
