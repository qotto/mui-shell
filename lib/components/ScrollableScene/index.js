"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(
    "div",
    { className: classes.root },
    _react2.default.createElement(
      "div",
      { className: classes.animation, id: "scrollable-scene" },
      children
    )
  );
};

ScrollableScene.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node.isRequired
} : {};

exports.default = (0, _styles.withStyles)(styles)(ScrollableScene);
module.exports = exports["default"];