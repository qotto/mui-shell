"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTransitionGroup = require("react-transition-group");

var _reactRouterDom = require("react-router-dom");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _AppBar = require("@material-ui/core/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _KeyboardArrowRight = require("@material-ui/icons/KeyboardArrowRight");

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _ArrowBack = require("@material-ui/icons/ArrowBack");

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

var _styles = require("@material-ui/core/styles");

var _RootRef = require("@material-ui/core/RootRef");

var _RootRef2 = _interopRequireDefault(_RootRef);

var _utils = require("../../utils");

var _RoutesContext = require("../../RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = function styles(theme) {
  return {
    breadcrumb: {
      overflowX: "auto"
    },
    breadcrumbContainer: {
      paddingLeft: "8px",
      whiteSpace: "nowrap",
      position: "relative",
      minHeight: "36px",
      display: "flex"
    },
    breadcrumbButton: {
      paddingRight: 0,
      paddingLeft: 0,
      minWidth: "auto",
      "&$disabled": {
        color: theme.palette.text.primary,
        paddingRight: "24px"
      }
    },
    breadcrumbItem: {
      "&.bcslide-enter": {
        opacity: "0",
        transform: "translateX(-20px)"
      },
      "&.bcslide-enter.bcslide-enter-active": {
        position: "absolute",
        opacity: 1,
        transform: "translateX(0)",
        transitionProperty: "transform, opacity",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease"
      },
      "&.bcslide-exit": {
        opacity: 1,
        transform: "translateX(0)"
      },
      "&.bcslide-exit.bcslide-exit-active": {
        position: "absolute",
        opacity: 0,
        transform: "translateX(-20px)",
        transitionProperty: "transform, opacity",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease"
      },
      flex: 1
    },
    goBackButton: {
      padding: "0 8px",
      height: "24px",
      minWidth: "auto"
    },
    disabled: {},
    hide: {
      visibility: "hidden"
    },
    shareButton: {
      height: "36px",
      width: "36px",
      padding: "6px"
    }
  };
};

var BreadcrumbItem = function BreadcrumbItem(_ref) {
  var _classNames;

  var match = _ref.match,
      route = _ref.route,
      classes = _ref.classes,
      breadcrumbFormatter = _ref.breadcrumbFormatter,
      children = _ref.children,
      lastLocation = _ref.lastLocation;

  var BreadcrumbComponent = route.breadcrumb;
  if (!match) {
    return null;
  }

  return _react2.default.createElement(
    "span",
    {
      className: (0, _classnames2.default)(classes.breadcrumbItem, (_classNames = {}, _classNames[classes.disabled] = match.isExact, _classNames))
    },
    _react2.default.createElement(
      _Button2.default,
      {
        mini: true,
        disabled: match.isExact,
        component: _reactRouterDom.Link,
        to: lastLocation[route.label] || match.url,
        color: match.isExact ? "default" : "primary",
        className: classes.breadcrumbButton,
        classes: { disabled: classes.disabled }
      },
      BreadcrumbComponent ? _react2.default.createElement(BreadcrumbComponent, { match: match }) : breadcrumbFormatter ? breadcrumbFormatter(route) : route.label,
      !match.isExact && _react2.default.createElement(_KeyboardArrowRight2.default, null)
    ),
    children
  );
};

BreadcrumbItem.propTypes = process.env.NODE_ENV !== "production" ? {
  match: _propTypes2.default.shape({
    isExact: _propTypes2.default.bool.isRequired,
    url: _propTypes2.default.string.isRequired
  }),
  route: _utils.routeType.isRequired
} : {};

var BreadcrumbRoute = function BreadcrumbRoute(_ref2) {
  var _ref2$url = _ref2.url,
      url = _ref2$url === undefined ? "" : _ref2$url,
      _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === undefined ? false : _ref2$disabled,
      location = _ref2.location,
      route = _ref2.route,
      match = _ref2.match,
      props = _objectWithoutProperties(_ref2, ["url", "disabled", "location", "route", "match"]);

  var firstMatch = false;

  return _react2.default.createElement(
    _reactTransitionGroup.TransitionGroup,
    { component: null },
    !disabled && _react2.default.createElement(
      _reactTransitionGroup.CSSTransition,
      {
        key: route.label,
        unmountOnExit: true,
        classNames: "bcslide",
        timeout: 200
      },
      _react2.default.createElement(
        BreadcrumbItem,
        _extends({ match: match, route: route }, props),
        (route.children || []).map(function (child) {
          var childMatch = (0, _reactRouterDom.matchPath)(location.pathname, {
            path: url + route.path + child.path
          });

          return _react2.default.createElement(BreadcrumbRoute, _extends({
            key: url + route.path + child.path,
            url: url + route.path,
            disabled: !childMatch || Boolean(firstMatch++),
            location: location,
            route: child,
            match: childMatch
          }, props));
        })
      )
    )
  );
};

var BackButton = function BackButton(_ref3) {
  var position = _ref3.position,
      history = _ref3.history,
      classes = _ref3.classes;
  return _react2.default.createElement(
    _Button2.default,
    {
      mini: true,
      disabled: position === 0,
      onClick: function onClick() {
        return history.goBack();
      },
      color: position === 0 ? "default" : "primary",
      className: classes.goBackButton
    },
    _react2.default.createElement(_ArrowBack2.default, null)
  );
};

var isIOS = navigator && navigator.platform && navigator.platform.match(/iPhone|iPod|iPad/);

var Breadcrumb = function (_PureComponent) {
  _inherits(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    var _temp, _this, _ret;

    _classCallCheck(this, Breadcrumb);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.scrollRight = function () {
      if (_this.appBarElt.scrollBy) {
        _this.appBarElt.scrollBy({
          left: 2147483647,
          behavior: "smooth"
        });
        //this.appBarElt.scrollLeft = 2147483647;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Breadcrumb.prototype.componentDidMount = function componentDidMount() {
    this.scrollRight();
  };

  Breadcrumb.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.scrollRight();
    }
  };

  Breadcrumb.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        classes = _props.classes,
        location = _props.location,
        history = _props.history,
        match = _props.match,
        routes = _props.routes,
        lastLocation = _props.lastLocation,
        position = _props.position,
        currentRoute = _props.currentRoute,
        rightBreadcrumbRender = _props.rightBreadcrumbRender,
        props = _objectWithoutProperties(_props, ["classes", "location", "history", "match", "routes", "lastLocation", "position", "currentRoute", "rightBreadcrumbRender"]);

    return _react2.default.createElement(
      _RootRef2.default,
      {
        rootRef: function rootRef(elt) {
          _this2.appBarElt = elt;
        }
      },
      _react2.default.createElement(
        _AppBar2.default,
        {
          position: "static",
          color: "default",
          className: classes.breadcrumb
        },
        _react2.default.createElement(
          "div",
          { className: classes.breadcrumbContainer },
          isIOS && _react2.default.createElement(BackButton, {
            classes: classes,
            location: location,
            position: position,
            history: history
          }),
          _react2.default.createElement(BreadcrumbRoute, _extends({
            route: routes,
            match: (0, _reactRouterDom.matchPath)(location.pathname, { path: routes.path }),
            classes: classes,
            location: location,
            lastLocation: lastLocation
          }, props)),
          rightBreadcrumbRender && rightBreadcrumbRender(currentRoute)
        )
      )
    );
  };

  return Breadcrumb;
}(_react.PureComponent);

var BreadcrumbWrapper = function BreadcrumbWrapper(props) {
  return _react2.default.createElement(
    _RoutesContext2.default.Consumer,
    null,
    function (_ref4) {
      var routes = _ref4.routes,
          currentRoute = _ref4.currentRoute,
          lastLocation = _ref4.lastLocation,
          position = _ref4.position;
      return _react2.default.createElement(Breadcrumb, _extends({
        routes: routes,
        currentRoute: currentRoute,
        lastLocation: lastLocation,
        position: position
      }, props));
    }
  );
};

exports.default = (0, _reactRouterDom.withRouter)((0, _styles.withStyles)(styles)(BreadcrumbWrapper));
module.exports = exports["default"];