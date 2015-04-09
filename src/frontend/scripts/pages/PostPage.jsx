var _ = require('lodash');
var React = require('react');
var Router = require('react-router');

var PostCard = require('../components/PostCard.jsx');
var PostInfo = require('../components/PostInfo.jsx');
var PostContent = require('../components/PostContent.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var Loader = require('../components/Loader.jsx');
var postService = require('../../../services/post-service');
var transform = require('../api/post-transform.jsx');

var Project = React.createClass({
    mixins: [Router.State, UtilMixin],

    render: function render() {
        return (
            <div className="page post-page">
                {this.getLoaderElement()}
                {this._getPageContent(this.props)}
            </div>
        );
    },

    statics: {
        fetchData: function fetchData(routeState) {
            return postService.getPostById(routeState.params.id);
        }
    },

    componentDidMount: function componentDidMount() {
        this.updateData();
    },

    _getPageContent: function _getPageContent(props) {
        if (_.isEmpty(props.data)) {
            return null;
        }

        var post = transform.transformPost(props.data);

        return (
            <div className="page-content">
                <PostCard post={post} />
                <div className="post-details">
                    <PostInfo post={post} />
                    <PostContent post={post} />
                </div>
            </div>
        );
    }
});

module.exports = Project;
