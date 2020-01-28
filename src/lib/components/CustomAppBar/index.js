import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolBar: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      padding: "0 2px"
    }
  },
  rightSide: {
    flex: 1
  },
  originalColor: {
    ...theme.typography.h6,
    color: "inherit"
  }
});

const CustomAppBar = ({ openMenu, classes, hideMenu, leftAppBarComponent, rightAppBarComponent, appTitle }) => (
  <AppBar position="static">
    <Toolbar className={classes.toolBar}>
      {!hideMenu && (
        <Hidden lgUp>
          <IconButton aria-label="open drawer" onClick={openMenu} className={classes.originalColor}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      )}
      {leftAppBarComponent || <div className={classes.originalColor}>{appTitle}</div>}
      <span className={classes.rightSide} />
      {rightAppBarComponent}
    </Toolbar>
  </AppBar>
);

CustomAppBar.propTypes = {
  leftAppBarComponent: PropTypes.node,
  rightAppBarComponent: PropTypes.node,
  appTitle: PropTypes.string,
  hideMenu: PropTypes.bool,
  openMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(CustomAppBar);
