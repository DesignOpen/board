var React = require('react');

var Loader = React.createClass({
    render: function render() {
        return (
            <div className="loader">
                <img alt="Loading.." src="/images/loader.svg" />
            </div>
        );
    }
});

module.exports = Loader;
