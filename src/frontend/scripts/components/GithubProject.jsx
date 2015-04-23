var React = require('react');

var GithubProject = React.createClass({
    render: function render() {
        return (
            <div className="github-project">
                bendc / sprint
                A tiny, lightning fast jQuery-like library for modern browsers.
                JavaScript • 1,697 stars today • Built by  @bendc
                <h2 className="github-project-name">{name}<h2>
                <p className="github-project-description">{description}<p>
                <p className="github-project-description">{description}<p>
            </div>
        );
    }
});

module.exports = GithubProject;
