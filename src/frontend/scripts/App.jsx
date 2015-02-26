var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var MenuBar = require('./components/MenuBar.jsx');


var App = React.createClass({
    render: function render() {
        // All elements which appear in all pages should be here
        return (
            <div>
                <MenuBar />
                <RouteHandler
                    data={this.props.data}
                    params={this.props.params}
                    query={this.props.query} />
            </div>
        );
    }
});

module.exports = App;
