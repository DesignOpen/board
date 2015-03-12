var _ = require('lodash');
var React = require('react');
var postActionCreator = require('../actions/post-action-creator.jsx');

var NewPostPage = React.createClass({

    render: function render() {
        return (
            <div className="page new-post-page">
                <h1>New post</h1>

                <label htmlFor="name-input">Name</label>
                <input id="name-input" placeholder="Name" type="text" ref="name" />

                <label htmlFor="description-input">Description</label>
                <input id="description-input" placeholder="Description" type="text" ref="description" />

                <label htmlFor="content-input">Content</label>
                <textarea id="content-input" ref="content" />

                <button onClick={this._onSubmit}>Create</button>
            </div>
        );
    },

    _gatherInputData: function _gatherInputData() {
        return {
            name: this.refs.name.getDOMNode().value,
            description: this.refs.description.getDOMNode().value,
            content: this.refs.content.getDOMNode().value
        };
    },

    _onSubmit: function _onSubmit() {
        var post = this._gatherInputData();
        postActionCreator.createPost(post);
    }
});

module.exports = NewPostPage;
