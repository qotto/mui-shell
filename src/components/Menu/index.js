import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import RoutesContext from "../../RoutesContext";

const styles = theme => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: "block",
    backgroundSize: "contain"
  },
  drawerMenu: {
    flex: 1
  },
  drawerFooter: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "12px",
    margin: "4px"
  },
  drawerPaper: {
    height: "100%",
    width: "200px"
  },
  activeMenuItem: {
    backgroundColor: "rgba(0,0,0,0.1)"
  }
});

const Menu = ({
  toggled,
  openMenu,
  closeMenu,
  menuLogoSrc,
  classes,
  linkFormatter,
  menuLabelFormatter,
  drawerFooter
}) => {
  const Link = linkFormatter || NavLink;

  const drawer = (
    <Fragment>
      <Link
        to="/"
        className={classes.drawerHeader}
        style={{ background: `url("${menuLogoSrc}") no-repeat center` }}
        onClick={closeMenu}
      />
      <Divider />
      <List component="div" className={classes.drawerMenu}>
        <RoutesContext.Consumer>
          {({ flatRoutes, currentRoute, parentRoutes }) => {
            const activeRoute =
              currentRoute &&
              [currentRoute, ...parentRoutes].find(route => route.menu);
            return flatRoutes
              .filter(route => route.menu)
              .map(route => (
                <ListItem
                  key={route.label}
                  component={Link}
                  to={route.path}
                  exact={route.menu.exact}
                  isActive={() =>
                    route.fullPath === (activeRoute && activeRoute.fullPath)
                  }
                  activeClassName={classes.activeMenuItem}
                  button
                  onClick={closeMenu}
                >
                  <ListItemIcon>{route.menu.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      menuLabelFormatter
                        ? menuLabelFormatter(route)
                        : route.label
                    }
                  />
                </ListItem>
              ));
          }}
        </RoutesContext.Consumer>
      </List>
      {drawerFooter && (
        <Fragment>
          <Divider />
          <div className={classes.drawerFooter}>{drawerFooter}</div>
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          variant="temporary"
          open={toggled}
          onClose={closeMenu}
          onOpen={openMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            disableRestoreFocus: true
          }}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

Menu.propTypes = {
  toggled: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  menuLogoSrc: PropTypes.string,
  classes: PropTypes.object.isRequired,
  drawerFooter: PropTypes.node,
  linkFormatter: PropTypes.any,
  menuLabelFormatter: PropTypes.any
};

export default withStyles(styles)(Menu);
