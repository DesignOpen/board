var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UtilMixin = require('../mixins/UtilMixin.jsx');

var Footer = React.createClass({
    mixins: [UtilMixin],

    render: function render() {
        return (
            <footer className="footer">
                <div className="container row">
                    <div className="four columns">
                        {
                            this.content(
                                this.props.user,
                                this._getLoggedOutContent,
                                this._getLoggedInContent
                            )
                        }
                    </div>

                    <div className="eight columns footer-right">
                    <p>
                        A part of <a className="link-animated" href="http://designopen.org/">DesignOpen.org</a>,
                        organisation to help designers to contribute to open source.

                    </p>
                    </div>
                </div>
            </footer>
        );
    },

    _getLoggedOutContent: function _getLoggedOutContent() {
        return (
            <p>Looking for design
            contributions? <a className="link-animated" href="/api/session/create">Login</a> to
            submit your open source project.</p>
        )
    },

    _getLoggedInContent: function _getLoggedInContent() {
        return (
            <p>Looking for design
            contributions? <Link to="new-post" className="link-animated">Submit</Link> your
            open source project.</p>
        )
    },
});

module.exports = Footer;
