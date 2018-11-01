"use strict";

exports.__esModule = true;
exports.RoutesContext = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _components = require("./components");

var _utils = require("./utils");

var _RoutesContext = require("./RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        leftAppBarComponent = _props.leftAppBarComponent,
        rightAppBarComponent = _props.rightAppBarComponent,
        appTitle = _props.appTitle,
        documentTitleFormatter = _props.documentTitleFormatter,
        menuLabelFormatter = _props.menuLabelFormatter,
        linkFormatter = _props.linkFormatter,
        breadcrumbFormatter = _props.breadcrumbFormatter,
        drawerFooter = _props.drawerFooter;
    var menuToggled = this.state.menuToggled;


    var appContentStyle = hideMenu ? {
      marginLeft: "initial"
    } : undefined;

    return _react2.default.createElement(
      _RoutesContext.RoutesProvider,
      { routes: routes },
      !hideMenu && _react2.default.createElement(_components.Menu, {
        toggled: menuToggled,
        openMenu: this.openMenu,
        closeMenu: this.closeMenu,
        linkFormatter: linkFormatter,
        menuLabelFormatter: menuLabelFormatter,
        drawerFooter: drawerFooter
      }),
      _react2.default.createElement(_components.AppDocumentTitle, {
        appTitle: appTitle,
        documentTitleFormatter: documentTitleFormatter
      }),
      _react2.default.createElement(
        "div",
        { className: classes.appContent, style: appContentStyle },
        _react2.default.createElement(_components.Navbar, {
          hideMenu: hideMenu,
          openMenu: this.openMenu,
          appTitle: appTitle,
          leftAppBarComponent: leftAppBarComponent,
          rightAppBarComponent: rightAppBarComponent,
          breadcrumbFormatter: breadcrumbFormatter
        }),
        _react2.default.createElement(_components.AppRoutes, null)
      )
    );
  };

  return MuiShell;
}(_react2.default.Component);

MuiShell.propTypes = process.env.NODE_ENV !== "production" ? {
  routes: _utils.routeType.isRequired,
  hideMenu: _propTypes2.default.bool,
  leftAppBarComponent: _propTypes2.default.node,
  rightAppBarComponent: _propTypes2.default.node,
  drawerFooter: _propTypes2.default.node,
  appTitle: _propTypes2.default.string,
  linkFormatter: _propTypes2.default.any,
  documentTitleFormatter: _propTypes2.default.any,
  menuLabelFormatter: _propTypes2.default.any,
  breadcrumbFormatter: _propTypes2.default.any
} : {};

exports.RoutesContext = _RoutesContext2.default;
exports.default = (0, _styles.withStyles)(styles)(MuiShell);