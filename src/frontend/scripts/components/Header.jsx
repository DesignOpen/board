var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UtilMixin = require('../mixins/UtilMixin.jsx');

var Header = React.createClass({
    mixins: [UtilMixin],

    render: function render() {
        var user = this.props.user;
        var userName = user
            ? <p>{user.name}</p>
            : null;

        return (
            <header>
                <div className="box">
                    <div className="logo">
                        <Link to="index">
                            <h1>
                                <span>Design Open</span>
                                <span>Project Board</span>
                            </h1>
                        </Link>
                    </div>
                    <h5>A collection of open source projects
                    looking for design contributions.</h5>
                </div>

                {userName}
                {this.content(user, this._getLogoutUrl, this._getLoginUrl)}

            </header>
        );
    },

    _getLoginUrl: function _getLoginUrl() {
        return (
            <a className="link-animated" href="/api/session/create">
                Sign in with GitHub
            </a>
        );
    },

    _getLogoutUrl: function _getLogoutUrl() {
        return (
            <a className="link-animated" href="/api/session/delete">
                Logout
            </a>
        );
    }
});

module.exports = Header;
