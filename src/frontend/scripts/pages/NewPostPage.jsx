var React = require('react');
var Router = require('react-router');
var postActionCreator = require('../actions/post-action-creator.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var MediumEditorInput = require('../components/MediumEditorInput.jsx');
var toMarkdown = require('to-markdown');

var NewPostPage = React.createClass({
    mixins: [UtilMixin, Router.Navigation],

    getInitialState: function(){
        return {postHtmlContent: null};
    },

    render: function render() {
        return (
            <div className="page new-post-page">
                {this.getLoaderElement()}
                {this._getPageContent(this.props)}
            </div>
        );
    },

    _getPageContent: function _getPageContent() {
        return (
            <div className="page-content">
                <h1>New post</h1>

                <label htmlFor="name-input">Name</label>
                <input
                    id="name-input"
                    placeholder="Name"
                    type="text"
                    ref="name" />

                <label htmlFor="description-input">Description</label>
                <input
                    id="description-input"
                    placeholder="Description"
                    type="text"
                    ref="description" />

                <label>Content</label>
                <MediumEditorInput onChange={this._onEditorInputChange}/>

                <button
                    disabled={this.isLoaderVisible()}
                    onClick={this._onSubmit}>
                    Create
                </button>

            </div>
        );
    },

    _gatherInputData: function _gatherInputData() {
        return {
            name: this.refs.name.getDOMNode().value,
            description: this.refs.description.getDOMNode().value,
            content: toMarkdown( this.state.postHtmlContent )
        };
    },

    _onSubmit: function _onSubmit() {
        var newPost = this._gatherInputData();

        this.showLoader();
        var self = this;
        postActionCreator.createPost(newPost)
        .then(function(post) {
            self.transitionTo('post', {id: post.id});
        })
        .catch(function(err) {
            var message = err.body ? err.body.error.message : err.message;
            self.showMessage('error', 'Error saving post:', message);
            console.error(err);
        })
        .finally(this.hideLoaderSafe);
    },

    _onEditorInputChange: function _onEditorInputChange(htmlContent) {
        this.setState({postHtmlContent: htmlContent});
    }
});

module.exports = NewPostPage;
