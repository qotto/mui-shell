import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const noSize = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0
};

const transition = {
  transitionProperty: "transform, opacity",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease"
};

const styles = theme => ({
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
    "&.scene-forward-enter.scene-forward-enter-active $animation": {
      ...noSize,
      ...transition,
      zIndex: 1,
      opacity: 0.99,
      transform: "translateY(0)"
    },
    "&.scene-forward-exit $animation": {
      opacity: 0.99
    },
    "&.scene-forward-exit.scene-forward-exit-active $animation": {
      ...noSize,
      ...transition,
      opacity: 0.01
    },
    "&.scene-backward-enter.scene-backward-enter-active $animation": {
      ...noSize
    },
    "&.scene-backward-exit $animation": {
      opacity: 0.99,
      transform: "translateY(0)"
    },
    "&.scene-backward-exit.scene-backward-exit-active $animation": {
      ...noSize,
      ...transition,
      zIndex: 1,
      opacity: 0.01,
      transform: "translateY(10px)"
    }
  }
});

const ScrollableScene = ({ classes, children }) => (
  <div className={classes.root}>
    <div className={classes.animation} id="scrollable-scene">
      {children}
    </div>
  </div>
);

ScrollableScene.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(ScrollableScene);
