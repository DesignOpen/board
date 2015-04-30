var React = require('react');


var MediumEditorInput = React.createClass({

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: function() {},
            help: true
        };
    },

    getInitialState: function getInitialState() {
        return {mediumEditor: null}
    },

    render: function render() {
        var content = this.props.content;

        return (
            <div className="medium-editor-input">
                { this.props.help ? this._getHelpContent() : null }
                <div className="markdown-body markdown-input input-default" ref="editor">
                </div>
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
        var editorElement = React.findDOMNode(this.refs.editor);
        var mediumEditor = new MediumEditor(editorElement, {
            buttons: ['bold', 'italic', 'anchor', 'header1', 'header2', 'quote']
        });
        var self = this;
        mediumEditor.on(editorElement, 'input', function() {
            var serialized = mediumEditor.serialize();
            self.props.onChange(serialized['element-0'].value);
        });
        this.setState({mediumEditor: mediumEditor});
    },

    componentWillUnmount: function componentWillUnmount() {
        if (this.state.mediumEditor) {
            this.state.mediumEditor.destroy();
        }
    },

    _getHelpContent: function _getHelpContent() {
        return (
            <p className="medium-editor-input-help">
                Editor supports text formatting.
                Select text to get started.
            </p>
        )
    }
});

module.exports = MediumEditorInput;
