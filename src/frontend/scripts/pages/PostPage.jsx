var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var StateMixin = Router.State;

var UtilMixin = require('../mixins/UtilMixin.jsx');
var Loader = require('../components/Loader.jsx');
var postService = require('../../../services/post-service');

var Project = React.createClass({
    mixins: [StateMixin, UtilMixin],

    render: function render() {
        var data = _.merge({
            name: '',
            id: ''
        }, this.props.data);

        return (
            <div className="page">
                {this.getLoaderElement()}

                <h1>{data.name}</h1>
                <h3>{data.id}</h3>
            </div>
        );
    },

    statics: {
        fetchData: function fetchData(routeState) {
            return postService.getPostById(routeState.params.id);
        }
    },

    componentDidMount: function componentDidMount() {
        this.updateData();
    }
});

module.exports = Project;
