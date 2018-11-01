import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
  return React.createElement(
    "div",
    { className: classes.root },
    children
  );
};

FullscreenScene.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
} : {};

export default withStyles(styles)(FullscreenScene);