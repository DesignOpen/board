var React = require('react');
var appUtil = require('../utils/app-util.jsx');

var PostInfo = React.createClass({
    render: function render() {
        var post = this.props.post;

        var githubUserUrl = 'https://github.com/' + post.author.githubUsername;
        return (
            <ul className="post-info">
                <li>
                    <h3>Description</h3>
                    <p>{post.description}</p>
                </li>
                <li>
                    <h3>Post Author</h3>
                    <img
                        className="post-author-avatar"
                        src={appUtil.apiUrl('/users/' + post.author.id + '/avatar')} />
                    <p>
                        <a className="link-animated" href={githubUserUrl}>
                            {post.author.name}
                        </a>
                    </p>
                </li>
            </ul>
        );
    }
});

module.exports = PostInfo;
