var React = require('react');

var PostInfo = React.createClass({
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
            <ul>
                <li>
                    <h3>Description</h3>
                    <p>{post.description}</p>
                </li>
                <li>
                    <h3>Post Author</h3>
                    <p>John Smith</p>
                </li>
                <li>
                    <h3>Last Commit</h3>
                    <p>Yesterday</p>
                </li>
                <li>
                    <h3>Organization</h3>
                    <p>Sass</p>
                </li>
                <li>
                    <h3>Forks Count</h3>
                    <p>9</p>
                </li>
                <li>
                    <h3>Watchers</h3>
                    <p>8</p>
                </li>
            </ul>
        );
    }
});

module.exports = PostInfo;
