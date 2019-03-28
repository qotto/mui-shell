function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Menu, Navbar, AppDocumentTitle, AppRoutes } from "./components";
import { routeType } from "./utils";
import RoutesContext, { RoutesProvider } from "./RoutesContext";

var styles = function styles(theme) {
  var _appContent;

  return {
    appContent: (_appContent = {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    }, _appContent[theme.breakpoints.up("lg")] = {
      marginLeft: "200px"
    }, _appContent)
  };
};

var MuiShell = function (_React$Component) {
  _inherits(MuiShell, _React$Component);

  function MuiShell() {
    var _temp, _this, _ret;

    _classCallCheck(this, MuiShell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      menuToggled: false
    }, _this.openMenu = function () {
      _this.setState({
        menuToggled: true
      });
    }, _this.closeMenu = function () {
      _this.setState({
        menuToggled: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MuiShell.prototype.render = function render() {
    var _props = this.props,
        classes = _props.classes,
        routes = _props.routes,
        hideMenu = _props.hideMenu,
        menuLogoSrc = _props.menuLogoSrc,
        leftAppBarComponent = _props.leftAppBarComponent,
        rightAppBarComponent = _props.rightAppBarComponent,
        appTitle = _props.appTitle,
        documentTitleFormatter = _props.documentTitleFormatter,
        menuLabelFormatter = _props.menuLabelFormatter,
        linkFormatter = _props.linkFormatter,
        breadcrumbFormatter = _props.breadcrumbFormatter,
        drawerFooter = _props.drawerFooter,
        rightBreadcrumbRender = _props.rightBreadcrumbRender;
    var menuToggled = this.state.menuToggled;


    var appContentStyle = hideMenu ? {
      marginLeft: "initial"
    } : undefined;

    return React.createElement(
      RoutesProvider,
      { routes: routes },
      !hideMenu && React.createElement(Menu, {
        toggled: menuToggled,
        openMenu: this.openMenu,
        closeMenu: this.closeMenu,
        menuLogoSrc: menuLogoSrc,
        linkFormatter: linkFormatter,
        menuLabelFormatter: menuLabelFormatter,
        drawerFooter: drawerFooter
      }),
      React.createElement(AppDocumentTitle, {
        appTitle: appTitle,
        documentTitleFormatter: documentTitleFormatter
      }),
      React.createElement(
        "div",
        { className: classes.appContent, style: appContentStyle },
        React.createElement(Navbar, {
          hideMenu: hideMenu,
          openMenu: this.openMenu,
          appTitle: appTitle,
          leftAppBarComponent: leftAppBarComponent,
          rightAppBarComponent: rightAppBarComponent,
          breadcrumbFormatter: breadcrumbFormatter,
          rightBreadcrumbRender: rightBreadcrumbRender
        }),
        React.createElement(AppRoutes, null)
      )
    );
  };

  return MuiShell;
}(React.Component);

MuiShell.propTypes = process.env.NODE_ENV !== "production" ? {
  routes: routeType.isRequired,
  hideMenu: PropTypes.bool,
  menuLogoSrc: PropTypes.string,
  leftAppBarComponent: PropTypes.node,
  rightAppBarComponent: PropTypes.node,
  drawerFooter: PropTypes.node,
  appTitle: PropTypes.string,
  linkFormatter: PropTypes.any,
  documentTitleFormatter: PropTypes.any,
  menuLabelFormatter: PropTypes.any,
  breadcrumbFormatter: PropTypes.any,
  rightBreadcrumbRender: PropTypes.func
} : {};

export { RoutesContext };

export default withStyles(styles)(MuiShell);