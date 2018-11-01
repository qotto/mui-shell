"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AppBar = require("@material-ui/core/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require("@material-ui/core/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require("@material-ui/icons/Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  var _toolBar;

  return {
    toolBar: (_toolBar = {
      display: "flex"
    }, _toolBar[theme.breakpoints.down("md")] = {
      padding: "0 2px"
    }, _toolBar),
    rightSide: {
      flex: 1
    },
    originalColor: _extends({}, theme.typography.h6, {
      color: "inherit"
    })
  };
};

var CustomAppBar = function CustomAppBar(_ref) {
  var openMenu = _ref.openMenu,
      classes = _ref.classes,
      hideMenu = _ref.hideMenu,
      leftAppBarComponent = _ref.leftAppBarComponent,
      rightAppBarComponent = _ref.rightAppBarComponent,
      appTitle = _ref.appTitle;
  return _react2.default.createElement(
    _AppBar2.default,
    { position: "static" },
    _react2.default.createElement(
      _Toolbar2.default,
      { className: classes.toolBar },
      !hideMenu && _react2.default.createElement(
        _Hidden2.default,
        { lgUp: true },
        _react2.default.createElement(
          _IconButton2.default,
          {
            "aria-label": "open drawer",
            onClick: openMenu,
            className: classes.originalColor
          },
          _react2.default.createElement(_Menu2.default, null)
        )
      ),
      leftAppBarComponent || _react2.default.createElement(
        "div",
        { className: classes.originalColor },
        appTitle
      ),
      _react2.default.createElement("span", { className: classes.rightSide }),
      rightAppBarComponent
    )
  );
};

CustomAppBar.propTypes = process.env.NODE_ENV !== "production" ? {
  leftAppBarComponent: _propTypes2.default.node,
  rightAppBarComponent: _propTypes2.default.node,
  appTitle: _propTypes2.default.string,
  hideMenu: _propTypes2.default.bool,
  openMenu: _propTypes2.default.func.isRequired
} : {};

exports.default = (0, _styles.withStyles)(styles)(CustomAppBar);
module.exports = exports["default"];