# Coding style & conventions

JavaScript style is enforced with ESLint and JSCS.

## React

State changes in async callback functions should always use `setStateSafe` method
defined in **UtilMixin**. It will guard from setting state for unmounted components.
See https://github.com/facebook/react/issues/2787

### Component methods

Internal react methods are defined first, component's custom methods last.
Custom methods are prefixed with single underscore.

**Method order:**

* getDefaultProps
* getInitialState
* render
* statics

    ... other life cycle methods ..

* _myCustomMethod

This way you will first see what parameters(props) the component gets, how
they affect component's internal state and what the component renders.

### Mixins

Methods provided by mixins should not be prefixed with underscore.
