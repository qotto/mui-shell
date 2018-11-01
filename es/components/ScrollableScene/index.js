var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

var noSize = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0
};

var transition = {
  transitionProperty: "transform, opacity",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease"
};

var styles = function styles(theme) {
  return {
    animation: {
      backgroundColor: "initial"
    },
    root: {
      backgroundColor: "initial",
      position: "relative",
      "&.scene-forward-enter $animation": {
        opacity: 0.01,
        transform: "translateY(10px)"
      },
      "&.scene-forward-enter.scene-forward-enter-active $animation": _extends({}, noSize, transition, {
        zIndex: 1,
        opacity: 0.99,
        transform: "translateY(0)"
      }),
      "&.scene-forward-exit $animation": {
        opacity: 0.99
      },
      "&.scene-forward-exit.scene-forward-exit-active $animation": _extends({}, noSize, transition, {
        opacity: 0.01
      }),
      "&.scene-backward-enter.scene-backward-enter-active $animation": _extends({}, noSize),
      "&.scene-backward-exit $animation": {
        opacity: 0.99,
        transform: "translateY(0)"
      },
      "&.scene-backward-exit.scene-backward-exit-active $animation": _extends({}, noSize, transition, {
        zIndex: 1,
        opacity: 0.01,
        transform: "translateY(10px)"
      })
    }
  };
};

var ScrollableScene = function ScrollableScene(_ref) {
  var classes = _ref.classes,
      children = _ref.children;
  return React.createElement(
    "div",
    { className: classes.root },
    React.createElement(
      "div",
      { className: classes.animation, id: "scrollable-scene" },
      children
    )
  );
};

ScrollableScene.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
} : {};

export default withStyles(styles)(ScrollableScene);