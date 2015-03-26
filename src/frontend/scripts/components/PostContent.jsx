var React = require('react');

var PostContent = React.createClass({
    render: function render() {
        var post = this.props.post;

        return (
            <div className="post-content">
                <p>{post.content}</p>
            </div>
        );
    }
});

module.exports = PostContent;
