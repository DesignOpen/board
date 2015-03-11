var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PostCard = React.createClass({
    getDefaultProps: function getDefaultProps() {
        return {
            post: {
                name: '',
                createdAt: ''
            }
        };
    },

    render: function render() {
        var post = this.props.post;

        return (
            <article className="post-card">
                <Link to="post" params={{id: post.id}}>
                    <h2>{post.name}</h2>
                </Link>

                <h4>{post.createdAt}</h4>
            </article>
        );
    }
});

module.exports = PostCard;