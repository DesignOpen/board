var React = require('react');
var marked = require('react-marked');

var PostContent = React.createClass({
    render: function render() {
        var post = this.props.post;
        var renderedContent = marked(post.content);

        return (
            <div className="post-content">
                <p>{renderedContent}</p>
            </div>
        );
    }
});

module.exports = PostContent;
