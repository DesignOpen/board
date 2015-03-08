// Mixin to provide helpers for common needs in many components

var _ = require('lodash');
var React = require('react');
var Loader = require('../components/Loader.jsx');

var UtilMixin = {
    getInitialState: function getInitialState() {
        return {
            showLoader: false
        };
    },

    // Provides a safe way to set state in callback functions
    // See https://github.com/facebook/react/issues/2787
    setStateSafe: function setStateSafe(state, cb) {
        if (!this.isMounted()) {
            return;
        }

        this.setState(state, cb);
    },

    isLoading: function isLoading() {
        return this.state.showLoader;
    },

    showLoader: function showLoader() {
        this.setStateSafe({showLoader: true});
    },

    hideLoader: function hideLoader() {
        this.setStateSafe({showLoader: false});
    },

    // Return generic loader element displayed in page corner
    getLoaderElement: function getLoaderElement() {
        if (!this.state.showLoader) {
            return null;
        }

        return (
            <div className="top-corner">
                <Loader />
            </div>
        );
    },

    updateData: function updateData(opts) {
        opts = _.extend({
            showLoader: true
        }, opts);

        var routeState = {
            params: this.getParams(),
            query: this.getQuery()
        };

        var fetchPromise = this.props.fetchData(routeState);

        if (opts.showLoader) {
            this.showLoader();
            fetchPromise.finally(this.hideLoader);
        }
    }
};

module.exports = UtilMixin;
