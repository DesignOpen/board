var React = require('react');
var Router = require('react-router');
var _ = require('lodash')
var Link = Router.Link;

var UtilMixin = require('../mixins/UtilMixin.jsx');
var appUtil = require('../utils/app-util.jsx');

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
                {this.content(
                    user, 
                    _.bind(this._getLogoutUrl, this, user),
                    this._getLoginUrl
                )}

            </header>
        );
    },

    _getLoginUrl: function _getLoginUrl() {
        return (
            <a className="github-button" href="/api/session/create">
                <svg enable-background="new 0 0 32.6 31.8" height="32px" space="preserve" version="1.1" viewBox="0 0 32.6 31.8" width="33px" x="0px" y="0px"><defs></defs><path clip-rule="evenodd" d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C32.6,7.3,25.3,0,16.3,0z" fill-rule="evenodd"></path></svg>
                <span>Sign in with GitHub</span>
            </a>
        );
    },

    _getLogoutUrl: function _getLogoutUrl(user) {
        return (
            <a className="github-button" href="/api/session/delete">
                <img
                    src={appUtil.apiUrl('/users/' + user.id + '/avatar')} />
                <span>{user.githubUsername}</span>
            </a>
        );
    }
});

module.exports = Header;
