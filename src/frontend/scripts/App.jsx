var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var UtilMixin = require('./mixins/UtilMixin.jsx');
var Header = require('./components/Header.jsx');
var Footer = require('./components/Footer.jsx');

var App = React.createClass({
    mixins: [UtilMixin],

    getInitialState: function getInitialState() {
        return {
            // This data object contains all data that a single page needs
            pageData: this.props.data
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
        // Route changed and app received new params and query
        // We must data from previous page
        this.setState({
            pageData: null
        });
    },

    render: function render() {
        // Elements which appear in all pages should be here
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

    // Centralized data fetching method.
    // All pages fetch data using this function so that we have
    // control over all data fetches.
    // This allows us to save data state only in App level.
    // All components below get their data as props
    _fetchData: function _fetchData() {
        var self = this;

        return this.props.PageComponent.fetchData.apply(this, arguments)
        .then(function(data) {
            self.setStateSafe({
                pageData: data
            });

            return data;
        })
        .catch(function(err) {
            console.error('Error when fetching data', err);
            // TODO notify with a popup or similar
            throw err;
        });
    }
});

module.exports = App;
