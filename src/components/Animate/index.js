import React, { PureComponent } from "react";
import { CSSTransition } from "react-transition-group";

class Animate extends PureComponent {
  state = {
    lastIn: null,
    lastPassedProps: {}
  };

  static getDerivedStateFromProps = (props, state) => {
    const { lastIn } = state;
    const { in: inAnimation, passedProps } = props;

    if (!inAnimation && lastIn) {
      return null;
    }
    return {
      lastIn: inAnimation,
      lastPassedProps: passedProps
    };
  };

  render() {
    const { lastPassedProps } = this.state;
    const { children, passedProps, ...transitionProps } = this.props;

    const usedProps = transitionProps.in ? passedProps : lastPassedProps;

    return (
      <CSSTransition unmountOnExit {...transitionProps}>
        {children(usedProps)}
      </CSSTransition>
    );
  }
}

export default Animate;
