var React = require('react');
var marked = require('marked');

var PostContent = React.createClass({
    render: function render() {
        var post = this.props.post;
        // Set "dangerously" inner html because marked returns
        // rendered html as a string. It removes <script> tags
        // and other dangerous stuff.
        // SECURITY: This is a slight security concern! All XSS bugs
        //           in marked will affect our app too.
        var html = {
            __html: marked(post.content, {
                sanitize: true
            })
        };

        return (
            <div
                className="post-content"
                dangerouslySetInnerHTML={html} />
        );
    }
});

module.exports = PostContent;
