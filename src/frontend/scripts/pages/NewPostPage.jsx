var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Select = require('react-select');
var postActionCreator = require('../actions/post-action-creator.jsx');
var UtilMixin = require('../mixins/UtilMixin.jsx');
var userService = require('../../../services/user-service');

var NewPostPage = React.createClass({
    mixins: [Router.State, UtilMixin, Router.Navigation],

    getInitialState: function getInitialState() {
        return {githubProjectId: null}
    },

    render: function render() {
        return (
            <div className="page new-post-page">
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
                <h1>New post</h1>

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

                <label htmlFor="content-input">Content</label>
                <textarea id="content-input" ref="content" />

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
            content: this.refs.content.getDOMNode().value,
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
    }
});

module.exports = NewPostPage;
