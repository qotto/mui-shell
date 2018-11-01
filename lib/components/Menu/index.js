"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Drawer = require("@material-ui/core/Drawer");

var _Drawer2 = _interopRequireDefault(_Drawer);

var _SwipeableDrawer = require("@material-ui/core/SwipeableDrawer");

var _SwipeableDrawer2 = _interopRequireDefault(_SwipeableDrawer);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require("@material-ui/core/List");

var _List2 = _interopRequireDefault(_List);

var _ListItem = require("@material-ui/core/ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemText = require("@material-ui/core/ListItemText");

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _ListItemIcon = require("@material-ui/core/ListItemIcon");

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _styles = require("@material-ui/core/styles");

var _reactRouterDom = require("react-router-dom");

var _RoutesContext = require("../../RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    drawerHeader: _extends({}, theme.mixins.toolbar, {
      display: "block",
      background: "url(\"" + process.env.PUBLIC_URL + "/logos/256_bright_margin.png\") no-repeat center",
      backgroundSize: "contain"
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
      classes = _ref.classes,
      linkFormatter = _ref.linkFormatter,
      menuLabelFormatter = _ref.menuLabelFormatter,
      drawerFooter = _ref.drawerFooter;

  var Link = linkFormatter || _reactRouterDom.NavLink;

  var drawer = _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(Link, { to: "/", className: classes.drawerHeader, onClick: closeMenu }),
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(
      _List2.default,
      { component: "div", className: classes.drawerMenu },
      _react2.default.createElement(
        _RoutesContext2.default.Consumer,
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
            return _react2.default.createElement(
              _ListItem2.default,
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
              _react2.default.createElement(
                _ListItemIcon2.default,
                null,
                route.menu.icon
              ),
              _react2.default.createElement(_ListItemText2.default, {
                primary: menuLabelFormatter ? menuLabelFormatter(route) : route.label
              })
            );
          });
        }
      )
    ),
    drawerFooter && _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement(_Divider2.default, null),
      _react2.default.createElement(
        "div",
        { className: classes.drawerFooter },
        drawerFooter
      )
    )
  );

  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      _Hidden2.default,
      { lgUp: true },
      _react2.default.createElement(
        _SwipeableDrawer2.default,
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
    _react2.default.createElement(
      _Hidden2.default,
      { mdDown: true, implementation: "css" },
      _react2.default.createElement(
        _Drawer2.default,
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
  toggled: _propTypes2.default.bool.isRequired,
  openMenu: _propTypes2.default.func.isRequired,
  closeMenu: _propTypes2.default.func.isRequired,
  classes: _propTypes2.default.object.isRequired,
  drawerFooter: _propTypes2.default.node,
  linkFormatter: _propTypes2.default.any,
  menuLabelFormatter: _propTypes2.default.any
} : {};

exports.default = (0, _styles.withStyles)(styles)(Menu);
module.exports = exports["default"];