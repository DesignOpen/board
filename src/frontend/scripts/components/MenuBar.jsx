var React = require('react');
var Router = require('react-router');
var _ = require('lodash')
var Link = Router.Link;
var UtilMixin = require('../mixins/UtilMixin.jsx');
var appUtil = require('../utils/app-util.jsx');
var ToolTipMenu = require('./ToolTipMenu.jsx');

var MenuBar = React.createClass({
    mixins: [UtilMixin],

    render: function render() {
        var user = this.props.user;
        var userName = user
            ? <p>{user.name}</p>
            : null;

        return (
            <nav className="menu-bar nav-bar">
                <div className="container">
                    <div className="logo">
                        <Link to="index">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" enable-background="new 0 0 144 144" title="Design Open Logo"><g fill="#999"><path d="M72 60.601c-6.295 0-11.399 5.103-11.399 11.399 0 5.487 3.878 10.066 9.042 11.152v60.789c.784.025 1.567.059 2.357.059s1.573-.034 2.357-.06v-60.788c5.164-1.086 9.042-5.665 9.042-11.152 0-6.295-5.104-11.399-11.399-11.399zM144 72c0-39.765-32.235-72-72-72s-72 32.235-72 72c0 37.374 28.478 68.091 64.918 71.65l.001-.014c-.18-29.263-17.819-51.864-25.137-59.991v-.002s-3.006-3.604-1.303-7.924l13.328-33.805s2.466-6.249 7.945-6.249h24.496c5.479 0 7.945 6.249 7.945 6.249l13.328 33.805c1.703 4.32-1.303 7.924-1.303 7.924v.002c-7.318 8.127-24.958 30.729-25.137 59.991l.001.014c36.44-3.559 64.918-34.276 64.918-71.65z"></path></g></svg>
                        </Link>
                    </div>
                    <div className="separator"></div>
                    <div className="product-name">
                        <Link to="index">
                            Design<br/>
                            Board
                        </Link>
                    </div>

                    {
                        this.content(
                            this.props.user,
                            this._getLoggedOutContent,
                            this._getLoggedInContent
                        )
                    }

                </div>
            </nav>
        );
    },

    _getLoggedOutContent: function _getLoggedOutContent() {
        return (
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="projects">
                        Projects
                    </Link>
                </li>
                <li className="navbar-item">
                    <a href="/api/session/create">
                        Login
                    </a>
                </li>
            </ul>
        );
    },

    _getLoggedInContent: function _getLoggedInContent() {
        var user = this.props.user;

        var smallAvatar = <img className="avatar-small" src={appUtil.apiUrl('/users/' + user.id + '/avatar')} />;
        return (
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="projects">
                        Projects
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="new-post">
                        Submit project
                    </Link>
                </li>
                <li className="navbar-item">
                    <ToolTipMenu
                        items={
                            [{text: 'Logout'}]
                        }
                        onItemClick={this._onAvatarMenuItemClick}
                        content={smallAvatar} />
                </li>
            </ul>
        );
    },

    _onAvatarMenuItemClick: function _onAvatarMenuItemClick(index) {
        if (index === 0) {
            window.location.href = '/api/session/delete';
        }
    }
});

module.exports = MenuBar;
