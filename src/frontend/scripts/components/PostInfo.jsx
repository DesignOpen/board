var React = require('react');
var appUtil = require('../utils/app-util.jsx');

var PostInfo = React.createClass({
    render: function render() {
        var post = this.props.post;

        var githubUserUrl = 'https://github.com/' + post.author.githubUsername;
        return (
            <ul className="post-info">
                <li>
                    <div className="post-author-avatar">
                        <img
                            src={appUtil.apiUrl('/users/' + post.author.id + '/avatar')} />
                        <p className="post-author-name">
                            <a className="link-animated" href={githubUserUrl}>
                                {post.author.name}
                            </a>
                        </p>
                    </div>
                </li>
            </ul>
        );
    }
});

module.exports = PostInfo;
