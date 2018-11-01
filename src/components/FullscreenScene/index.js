import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
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
});

const FullscreenScene = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

FullscreenScene.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(FullscreenScene);
