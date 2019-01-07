var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var styles = function styles(theme) {
  return {
    drawerHeader: _extends({}, theme.mixins.toolbar, {
      display: "block"
    }),
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
  };
};

var Menu = function Menu(_ref) {
  var toggled = _ref.toggled,
      openMenu = _ref.openMenu,
      closeMenu = _ref.closeMenu,
      menuLogoSrc = _ref.menuLogoSrc,
      classes = _ref.classes,
      linkFormatter = _ref.linkFormatter,
      menuLabelFormatter = _ref.menuLabelFormatter,
      drawerFooter = _ref.drawerFooter;

  var Link = linkFormatter || NavLink;

  var drawer = React.createElement(
    Fragment,
    null,
    React.createElement(Link, {
      to: "/",
      className: classes.drawerHeader,
      style: {
        background: "url(\"" + menuLogoSrc + "\") no-repeat center",
        backgroundSize: "contain"
      },
      onClick: closeMenu
    }),
    React.createElement(Divider, null),
    React.createElement(
      List,
      { component: "div", className: classes.drawerMenu },
      React.createElement(
        RoutesContext.Consumer,
        null,
        function (_ref2) {
          var flatRoutes = _ref2.flatRoutes,
              currentRoute = _ref2.currentRoute,
              parentRoutes = _ref2.parentRoutes;

          var activeRoute = currentRoute && [currentRoute].concat(parentRoutes).find(function (route) {
            return route.menu;
          });
          return flatRoutes.filter(function (route) {
            return route.menu;
          }).map(function (route) {
            return React.createElement(
              ListItem,
              {
                key: route.label,
                component: Link,
                to: route.path,
                exact: route.menu.exact,
                isActive: function isActive() {
                  return route.fullPath === (activeRoute && activeRoute.fullPath);
                },
                activeClassName: classes.activeMenuItem,
                button: true,
                onClick: closeMenu
              },
              React.createElement(
                ListItemIcon,
                null,
                route.menu.icon
              ),
              React.createElement(ListItemText, {
                primary: menuLabelFormatter ? menuLabelFormatter(route) : route.label
              })
            );
          });
        }
      )
    ),
    drawerFooter && React.createElement(
      Fragment,
      null,
      React.createElement(Divider, null),
      React.createElement(
        "div",
        { className: classes.drawerFooter },
        drawerFooter
      )
    )
  );

  return React.createElement(
    Fragment,
    null,
    React.createElement(
      Hidden,
      { lgUp: true },
      React.createElement(
        SwipeableDrawer,
        {
          variant: "temporary",
          open: toggled,
          onClose: closeMenu,
          onOpen: openMenu,
          ModalProps: {
            keepMounted: true, // Better open performance on mobile.
            disableRestoreFocus: true
          },
          classes: {
            paper: classes.drawerPaper
          }
        },
        drawer
      )
    ),
    React.createElement(
      Hidden,
      { mdDown: true, implementation: "css" },
      React.createElement(
        Drawer,
        {
          variant: "permanent",
          open: true,
          classes: {
            paper: classes.drawerPaper
          }
        },
        drawer
      )
    )
  );
};

Menu.propTypes = process.env.NODE_ENV !== "production" ? {
  toggled: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  menuLogoSrc: PropTypes.string,
  classes: PropTypes.object.isRequired,
  drawerFooter: PropTypes.node,
  linkFormatter: PropTypes.any,
  menuLabelFormatter: PropTypes.any
} : {};

export default withStyles(styles)(Menu);