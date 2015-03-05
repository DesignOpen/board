var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var Header = require('./components/Header.jsx');
var Footer = require('./components/Footer.jsx');


var App = React.createClass({
    render: function render() {
        // All elements which appear in all pages should be here
        return (
            <div>
                <Header />
                <RouteHandler
                    data={this.props.data}
                    params={this.props.params}
                    query={this.props.query} />
                <Footer />
            </div>
        );
    }
});

module.exports = App;
