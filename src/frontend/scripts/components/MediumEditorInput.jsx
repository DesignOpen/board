var React = require('react');


var MediumEditorInput = React.createClass({
    
    getDefaultProps: function getDefaultProps() {
        return {onChange: function(){}}
    },

    getInitialState: function getInitialState() {
        return {mediumEditor: null}
    },

    render: function render() {
        
        var content = this.props.content;

        return (
            <div className="markdown-input input-default" ref="editor">
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
            placeholder: 'Enter text'
        });
        var self = this;
        mediumEditor.on(editorElement, 'input', function() {
            var serialized = mediumEditor.serialize(); 
            self.props.onChange(serialized['element-0'].value); 
        });
        this.setState({mediumEditor: mediumEditor});
    },

    componentWillUnmount: function componentWillUnmount() {
        if(this.state.mediumEditor){
            this.state.mediumEditor.destroy();
        }
    }
});

module.exports = MediumEditorInput;
