var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Select = require('react-select');
var toMarkdown = require('to-markdown');
var postActionCreator = require('../actions/post-action-creator.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var userService = require('../../../services/user-service');
var MediumEditorInput = require('../components/MediumEditorInput.jsx');


var NewPostPage = React.createClass({
    mixins: [Router.State, UtilMixin, Router.Navigation],

    getInitialState: function getInitialState() {
        return {githubProjectId: null}
    },

    getInitialState: function(){
        return {postHtmlContent: null};
    },

    render: function render() {
        return (
            <div className="page container new-post-page">
                {this.getLoaderElement()}
                {this._getPageContent(this.props)}
            </div>
        );
    },

    statics: {
        fetchData: function fetchData(routeState, user) {
            return userService.getReposById(user.id);
        }
    },

    componentDidMount: function componentDidMount() {
        this.updateData();
    },

    _getPageContent: function _getPageContent() {
        var projects = _.map(this.props.data, function(repo) {
            return {value: String(repo.id), label: repo.full_name};
        });
        var selectedProject = _.findWhere(projects, {
            value: this.state.githubProjectId
        });

        return (
            <div className="page-content">
                <h4>Submit a project</h4>

                <label>Project</label>
                <Select
                    name="project-selection"
                    options={projects}
                    value={selectedProject ? selectedProject.value : null}
                    onChange={this._onProjectChange} />

                <label htmlFor="name-input">Title</label>
                <input
                    id="name-input"
                    className="input"
                    placeholder="Title"
                    type="text"
                    ref="name" />

                <label htmlFor="categories-input">Categories</label>
                <input
                    id="categories-input-input"
                    className="input"
                    placeholder="Categories separated with space"
                    type="text"
                    ref="categories" />

                <label>Content</label>
                <MediumEditorInput onChange={this._onEditorInputChange}/>

                <button
                    disabled={this.isLoaderVisible()}
                    onClick={this._onSubmit}>
                    Submit
                </button>
            </div>
        );
    },

    _gatherInputData: function _gatherInputData() {
        return {
            name: this.refs.name.getDOMNode().value,
            categories: this.refs.categories.getDOMNode().value,
            content: toMarkdown(this.state.postHtmlContent),
            githubProjectId: this.state.githubProjectId
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

    _onProjectChange: function _onProjectChange(value) {
        this.setState({
            githubProjectId: value
        });
    },

    _onEditorInputChange: function _onEditorInputChange(htmlContent) {
        this.setState({
            postHtmlContent: htmlContent
        });
    }
});

module.exports = NewPostPage;
