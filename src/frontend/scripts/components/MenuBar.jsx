var React = require('react');


var SideBar = React.createClass({
    render: function render() {
        return (
            <div className="menu-bar">
                <h2>Design Open Project Board</h2>
                <h5>A collection of open source projects
                looking for design contributions.</h5>

            </div>
        );
    }
});

module.exports = SideBar;
