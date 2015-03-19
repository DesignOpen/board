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
                <ul>
                    {this._getPostCards()}
                </ul>
            </div>
        );
    },

    _getPostCards: function _getPostCards() {
        return _.map(this.props.posts, function(post) {
            return <li><PostCard key={post.id} post={post} /></li>;
        });
    }
});

module.exports = PostList
