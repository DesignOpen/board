var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var DATE_FORMAT = 'MMM D';

var PostCard = React.createClass({
    render: function render() {
        var post = this.props.post;
        var formattedCreatedAt = post.createdAt
            ? post.createdAt.format(DATE_FORMAT)
            : '';

        return (
            <article className="post-card">
                <Link to="post" params={{id: post.id}}>
                    <h2 className="post-card-header">{post.name}</h2>
                </Link>

                <h4 className="date">{formattedCreatedAt}</h4>
            </article>
        );
    }
});

module.exports = PostCard;
