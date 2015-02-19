var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


var Index = React.createClass({
    render: function render() {
        return (
            <div className="">
                <h1>Index</h1>
                <Link to="project" params={{id: 0}}>Project 0</Link>
            </div>
        );
    }
});

module.exports = Index;
