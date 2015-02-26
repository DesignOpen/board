var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var postService = require('../../../services/post-service');

var Index = React.createClass({
    render: function render() {
        return (
            <div className="page">
                <h1>Index</h1>
                {this.props.data}

                <h3>November</h3>
                <Link to="project" params={{id: 0}}>Project 0</Link>
            </div>
        );
    },

    statics: {
        fetchData: function fetchData(params) {
            return postService.getPosts();
        }
    }
});

module.exports = Index;
