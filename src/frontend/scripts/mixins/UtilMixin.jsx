// Mixin to provide helpers for common needs in many components

var _ = require('lodash');
var React = require('react');
var Loader = require('../components/Loader.jsx');
var constants = require('../../../constants');

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

    isLoaderVisible: function isLoaderVisible() {
        return this.state.showLoader;
    },

    showLoader: function showLoader() {
        this.setState({showLoader: true});
    },

    showLoaderSafe: function showLoaderSafe() {
        this.setStateSafe({showLoader: true});
    },

    hideLoader: function hideLoader() {
        this.setState({showLoader: true});
    },

    hideLoaderSafe: function hideLoaderSafe() {
        this.setStateSafe({showLoader: false});
    },

    showMessage: function showMessage(level, title, message) {
        window.alert(title + '\n' + message);
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

    roleAndAboveContent: function roleAndAboveContent(user, role, access, noAccess) {
        var roleLevel = constants.roleLevels[role];
        if (user.role.level >= roleLevel) {
            if (_.isFunction(access)) {
                return access(user);
            }

            return access;
        }

        if (_.isFunction(noAccess)) {
            return noAccess(user);
        }

        return noAccess;
    },

    content: function content(user, logged, notLogged) {
        if (user) {
            if (_.isFunction(logged)) {
                return logged(user);
            }

            return logged;
        }

        if (_.isFunction(notLogged)) {
            return notLogged(user);
        }

        return notLogged;
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
            fetchPromise.finally(this.hideLoaderSafe);
        }
    }
};

module.exports = UtilMixin;
