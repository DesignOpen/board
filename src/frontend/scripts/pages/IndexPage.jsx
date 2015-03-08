var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var UtilMixin = require('../mixins/UtilMixin.jsx');
var postService = require('../../../services/post-service');

var Index = React.createClass({
    mixins: [Router.State, UtilMixin],

    render: function render() {
        return (
            <div className="page">
                {this.getLoaderElement()}

                <h1>Index</h1>
                {this._getPosts()}

                <h3>November</h3>

                <a onClick={_.bind(this.updateData, this)}>Refresh</a>
            </div>
        );
    },

    statics: {
        fetchData: function fetchData() {
            return postService.getPosts();
        }
    },

    componentDidMount: function componentDidMount() {
        this.updateData();
    },

    _getPosts: function _getPosts() {
        var listItems = _.map(this.props.data, function(post) {
            return (
                <li key={post._id}>
                    <Link to="post" params={{id: post._id}}>{post.name}</Link>
                </li>
            );
        });

        return <ul>{listItems}</ul>;
    }
});

module.exports = Index;
