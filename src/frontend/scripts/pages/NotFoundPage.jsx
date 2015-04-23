var React = require('react');

var NotFoundPage = React.createClass({
    render: function render() {
        return (
            <div className="page not-found-page">
                <div className="page-content container">
                    <h2>Page not found</h2>
                </div>
            </div>
        );
    }
});

module.exports = NotFoundPage;
