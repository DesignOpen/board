# Coding style & conventions

JavaScript style is enforced with ESLint and JSCS.

## React

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
