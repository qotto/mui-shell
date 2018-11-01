var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

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
  return React.createElement(
    AppBar,
    { position: "static" },
    React.createElement(
      Toolbar,
      { className: classes.toolBar },
      !hideMenu && React.createElement(
        Hidden,
        { lgUp: true },
        React.createElement(
          IconButton,
          {
            "aria-label": "open drawer",
            onClick: openMenu,
            className: classes.originalColor
          },
          React.createElement(MenuIcon, null)
        )
      ),
      leftAppBarComponent || React.createElement(
        "div",
        { className: classes.originalColor },
        appTitle
      ),
      React.createElement("span", { className: classes.rightSide }),
      rightAppBarComponent
    )
  );
};

CustomAppBar.propTypes = process.env.NODE_ENV !== "production" ? {
  leftAppBarComponent: PropTypes.node,
  rightAppBarComponent: PropTypes.node,
  appTitle: PropTypes.string,
  hideMenu: PropTypes.bool,
  openMenu: PropTypes.func.isRequired
} : {};

export default withStyles(styles)(CustomAppBar);