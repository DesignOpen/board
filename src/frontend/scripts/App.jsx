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
            pageData: this.props.data,
            user: this.props.user
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
        // Route changed and app received new params and query
        // We must clear data from previous page
        this.setState({
            pageData: null
        });
    },

    render: function render() {
        // Elements which appear in all pages should be here
        var user = this.state.user;

        return (
            <div>
                <Header user={user} />
                <RouteHandler
                    data={this.state.pageData}
                    user={user}
                    params={this.props.params}
                    query={this.props.query}
                    fetchData={this._fetchData} />
                <Footer user={user} />
            </div>
        );
    },

    // Centralized data fetching method.
    // All pages fetch data using this function so that we have
    // control over all data fetches.
    // This allows us to save data state only in App level.
    // All components below get their data as props
    // Note: individual components may still save UI state
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
