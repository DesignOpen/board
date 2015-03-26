var React = require('react');

var Footer = React.createClass({
    render: function render() {
        return (
            <footer>
                <div className="box">
                    <p>Looking for design contributions?
                       Login to post your open source project.</p>
                    <p>A part of <a href="http://designopen.org/">DesignOpen.org</a></p>
                </div>
            </footer>
        );
    }
});

module.exports = Footer;
