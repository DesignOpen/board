var _ = require('lodash');
var React = require('react');
var Router = require('react-router');

var PostCard = require('../components/PostCard.jsx');
var PostInfo = require('../components/PostInfo.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var Loader = require('../components/Loader.jsx');
var postService = require('../../../services/post-service');

var NON_BREAKING_SPACE = '\u00A0';

var Project = React.createClass({
    mixins: [Router.State, UtilMixin],

    render: function render() {
        var post = _.merge({
            name: NON_BREAKING_SPACE,
            id: NON_BREAKING_SPACE
        }, this.props.data);

        return (
            <div className="page">
                {this.getLoaderElement()}

                <PostCard post={post} />
                <PostInfo post={post} />

                <p>{post.content}</p>
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
    }
});

module.exports = Project;
