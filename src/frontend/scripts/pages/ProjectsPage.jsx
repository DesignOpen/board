var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PostList = require('../components/PostList.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var postService = require('../../../services/post-service');
var transform = require('../api/post-transform.jsx');

var ProjectsPage = React.createClass({
    mixins: [Router.State, UtilMixin],

    render: function render() {
        return (
            <div className="page projects-page">
                {this.getLoaderElement()}
                {this._getPageContent(this.props)}
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

    _getPageContent: function _getPageContent(props) {
        var posts = _.map(props.data, transform.transformPost);
        return (
            <div className="page-content container">
                <h4>Recent projects</h4>
                <PostList posts={posts}/>
            </div>
        );
    },
});

module.exports = ProjectsPage;
