var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var IndexPage = React.createClass({
    render: function render() {
        return (
            <div className="page index-page">
                <div className="page-content container">
                    <h4>Design Board</h4>

                    <div className="row">
                        <div className="six columns">
                            <p>
                            We think the best way to improve the design industry
                            is to work in the open. Open source projects need
                            designers as much as other any other projects, maybe
                            more so. This project board lists projects looking
                            for design contributions.
                            </p>
                        </div>

                        <div className="six columns">
                            <p>
                            You don’t have to be an expert programmer to contribute
                            to an open source project. Some interactions are best explained
                            through an interactive prototype. This might take you out
                            of your comfort zone a bit, but use contributing to an
                            open source project as an excuse to sharpen your
                            development skills, and add another tool to your toolbox.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = IndexPage;
