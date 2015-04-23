var React = require('react');
var _ = require('lodash');
var OnClickOutsideMixin = require('react-onclickoutside');

var ToolTipMenu = React.createClass({
    mixins: [OnClickOutsideMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            // Items is a list of menu items
            // single item: {text: 'About', disabled: true}
            items: [],
            onItemClick: function() {},
            open: false,
            // This value answers to question: relative to content,
            // where should the menu be drawn?
            // Supported values: bottom-right, bottom-left
            position: 'bottom-left',

            // If menu should close when single item is clicked
            closeOnItemClick: true,

            content: null
        };
    },

    getInitialState: function getInitialState() {
        return {
            open: this.props.open
        };
    },

    render: function render() {
        var maybeMenu = this.state.open ? this._createMenu() : null;

        return (
            <div className="tool-tip-menu no-select">
                <a className="tool-tip-menu__button" onClick={this._onIconClick}>
                    {this.props.content}
                </a>

                {maybeMenu}
            </div>
        );
    },

    handleClickOutside: function handleClickOutside() {
        this.setState({
            open: false
        });
    },

    _createMenu: function _createMenu() {
        var self = this;

        var elements = _.map(this.props.items, function(item, index) {
            var disabledState = item.disabled
                ? 'tool-tip-menu__item--disabled'
                : '';

            var classes = 'tool-tip-menu__item ' + disabledState;
            return (
                <li onClick={_.bind(self._onItemClick, self, index)}
                    className={classes}>
                    <a>{item.text}</a>
                </li>
            );
        });

        var menuClasses = 'tool-tip-menu__menu ';
        menuClasses += 'tool-tip-menu__menu--' + this.props.position;
        return (
            <ul className={menuClasses}>
                { elements }
            </ul>
        );
    },

    _onItemClick: function _onItemClick(index, event) {
        if (this.props.items[index].disabled) {
            return;
        }

        this.props.onItemClick(index, event);

        if (this.props.closeOnItemClick) {
            this.setState({
                open: false
            });
        }
    },

    _onIconClick: function _onIconClick(event) {
        this.setState({
            open: !this.state.open
        });
    }
});

module.exports = ToolTipMenu;
