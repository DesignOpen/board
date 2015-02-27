var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;


var postService = require('../../../services/post-service');


var Index = React.createClass({
    mixins: [State],

    render: function render() {
        return (
            <div className="page">
                <h1>Index</h1>
                {this._getPosts()}

                <h3>November</h3>
                <Link to="project" params={{id: 0}}>Project 0</Link>

                <a onClick={_.bind(this._refresh, this)}>Refresh</a>
            </div>
        );
    },

    componentDidMount: function componentDidMount() {
        this._fetchData();
    },

    _getPosts: function _getPosts() {
        var listItems = _.map(this.props.data, function(post) {
            return <li>{post.name}</li>;
        });

        return <ul>{listItems}</ul>;
    },

    _refresh: function _refresh() {
        this._fetchData();
    },

    _fetchData: function _fetchData() {
        Index.fetchData({
            query: this.getQuery(),
            params: this.getParams()
        });
    },

    statics: {
        fetchData: function fetchData(params) {
            return postService.getPosts();
        }
    }
});

module.exports = Index;
