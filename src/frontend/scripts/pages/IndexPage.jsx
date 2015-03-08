var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PostList = require('../components/PostList.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var postService = require('../../../services/post-service');

var Index = React.createClass({
    mixins: [Router.State, UtilMixin],

    render: function render() {
        return (
            <div className="page">
                {this.getLoaderElement()}

                <h1>Index</h1>
                <PostList posts={this.props.data}/>
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
    }
});

module.exports = Index;
