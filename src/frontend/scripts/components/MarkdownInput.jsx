var React = require('react');


var MarkdownInput = React.createClass({
    getInitialState: function getInitialState() {
        return {mediumEditor: null}
    },

    render: function render() {
        
        var content = this.props.content;

        return (
            <div className="markdown-editor" ref="editor">
dasdas
            </div>
        );
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
        // React component should not mess with medium editor
        return false;
    },

    componentDidMount: function componentDidMount() {

        // These modules cannot be required on server
        var MediumEditor = require('medium-editor');
        var mediumEditor = new MediumEditor(React.findDOMNode(this.refs.editor), {
            placeholder: 'Enter text'
        });
        this.setState({mediumEditor: mediumEditor});

    },

    componentWillUnmount: function componentWillUnmount() {
        if(this.state.mediumEditor){
            this.state.mediumEditor.destroy();
        }
    }
});

module.exports = MarkdownInput;
