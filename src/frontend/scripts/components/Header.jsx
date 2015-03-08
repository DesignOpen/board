var React = require('react');

var Header = React.createClass({
    render: function render() {
        return (
            <div className="header">
                <div className="logo"><h1>
                <span>Design Open</span>
                <span>Project Board</span>
                </h1></div>
                <h5>A collection of open source projects
                looking for design contributions.</h5>
            </div>
        );
    }
});

module.exports = Header
