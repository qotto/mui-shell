"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "inherit",
      position: "relative"
    },
    "@global": {
      html: {
        height: "100%"
      },
      body: {
        height: "100%"
      }
    }
  };
};

var FullscreenScene = function FullscreenScene(_ref) {
  var classes = _ref.classes,
      children = _ref.children;
  return _react2.default.createElement(
    "div",
    { className: classes.root },
    children
  );
};

FullscreenScene.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node.isRequired
} : {};

exports.default = (0, _styles.withStyles)(styles)(FullscreenScene);
module.exports = exports["default"];