var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var Header = require('./components/Header.jsx');
var Footer = require('./components/Footer.jsx');


var App = React.createClass({
    getInitialState: function getInitialState() {
        return {
            // This data object contains all data that a single page needs
            pageData: this.props.data
        };
    },

    render: function render() {
        // All elements which appear in all pages should be here
        return (
            <div>
                <Header />
                <RouteHandler
                    data={this.state.pageData}
                    params={this.props.params}
                    query={this.props.query} 
                    fetchData={this._fetchData} />
                <Footer />
            </div>
        );
    },

    _fetchData: function _fetchData() {
        var self = this;

        return this.props.PageComponent.fetchData.apply(this, arguments)
        .then(function(data) {
            console.log('Fetched new data', data)
            self.setState({
                pageData: data
            });
        })
        .catch(function(err) {
            console.error('Error when fetching data', err);
            throw err;
        });
    }
});

module.exports = App;
