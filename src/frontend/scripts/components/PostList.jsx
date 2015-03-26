var _ = require('lodash');
var React = require('react');

var PostCard = require('./PostCard.jsx');

var PostList = React.createClass({
    getDefaultProps: function getDefaultProps() {
        return {
            posts: []
        };
    },

    render: function render() {
        return (
            <div className="post-list">
                {this._getContent()}
            </div>
        );
    },

    _getContent: function _getContent() {
        if (_.isEmpty(this.props.posts)) {
            return <p>No posts</p>;
        }

        return (
            <ul>
                {this._getPostCards()}
            </ul>
        );
    },

    _getPostCards: function _getPostCards() {
        return _.map(this.props.posts, function(post) {
            return <li><PostCard key={post.id} post={post} /></li>;
        });
    }
});

module.exports = PostList
