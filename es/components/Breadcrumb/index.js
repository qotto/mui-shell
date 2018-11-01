var _class, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link, withRouter, matchPath } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";

import { routeType } from "../../utils";
import RoutesContext from "../../RoutesContext";

var styles = function styles(theme) {
  return {
    breadcrumb: {
      overflowX: "auto"
    },
    breadcrumbContainer: {
      paddingLeft: "8px",
      whiteSpace: "nowrap",
      position: "relative",
      minHeight: "36px"
    },
    breadcrumbButton: {
      paddingRight: 0,
      paddingLeft: 0,
      height: "24px",
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
      }
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

  return React.createElement(
    "span",
    {
      className: classNames(classes.breadcrumbItem, (_classNames = {}, _classNames[classes.disabled] = match.isExact, _classNames))
    },
    React.createElement(
      Button,
      {
        mini: true,
        disabled: match.isExact,
        component: Link,
        to: lastLocation[match.url || "/"] || match.url,
        color: match.isExact ? "default" : "primary",
        className: classes.breadcrumbButton,
        classes: { disabled: classes.disabled }
      },
      BreadcrumbComponent ? React.createElement(BreadcrumbComponent, { match: match }) : breadcrumbFormatter ? breadcrumbFormatter(route) : route.label,
      !match.isExact && React.createElement(KeyboardArrowRightIcon, null)
    ),
    children
  );
};

BreadcrumbItem.propTypes = process.env.NODE_ENV !== "production" ? {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired
  }),
  route: routeType.isRequired
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

  return React.createElement(
    TransitionGroup,
    { component: null },
    !disabled && React.createElement(
      CSSTransition,
      {
        key: route.label,
        unmountOnExit: true,
        classNames: "bcslide",
        timeout: 200
      },
      React.createElement(
        BreadcrumbItem,
        _extends({ match: match, route: route }, props),
        (route.children || []).map(function (child) {
          var childMatch = matchPath(location.pathname, {
            path: url + route.path + child.path
          });

          return React.createElement(BreadcrumbRoute, _extends({
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
  return React.createElement(
    Button,
    {
      mini: true,
      disabled: position === 0,
      onClick: function onClick() {
        return history.goBack();
      },
      color: position === 0 ? "default" : "primary",
      className: classes.goBackButton
    },
    React.createElement(ArrowBackIcon, null)
  );
};

var isIOS = navigator && navigator.platform && navigator.platform.match(/iPhone|iPod|iPad/);

var Breadcrumb = (_temp2 = _class = function (_PureComponent) {
  _inherits(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    var _temp, _this, _ret;

    _classCallCheck(this, Breadcrumb);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      locations: [],
      lastLocation: {},
      position: null
    }, _this.scrollRight = function () {
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
        props = _objectWithoutProperties(_props, ["classes", "location", "history", "match"]);

    var _state = this.state,
        lastLocation = _state.lastLocation,
        position = _state.position;


    return React.createElement(
      RootRef,
      {
        rootRef: function rootRef(elt) {
          _this2.appBarElt = elt;
        }
      },
      React.createElement(
        AppBar,
        {
          position: "static",
          color: "default",
          className: classes.breadcrumb
        },
        React.createElement(
          "div",
          { className: classes.breadcrumbContainer },
          isIOS && React.createElement(BackButton, {
            classes: classes,
            location: location,
            position: position,
            history: history
          }),
          React.createElement(
            RoutesContext.Consumer,
            null,
            function (_ref4) {
              var routes = _ref4.routes;
              return React.createElement(BreadcrumbRoute, _extends({
                route: routes,
                match: matchPath(location.pathname, { path: routes.path }),
                classes: classes,
                location: location,
                lastLocation: lastLocation
              }, props));
            }
          )
        )
      )
    );
  };

  return Breadcrumb;
}(PureComponent), _class.getDerivedStateFromProps = function (props, state) {
  if (props.location !== state.locations[state.position]) {
    var _extends2;

    var index = state.locations.findIndex(function (l) {
      return l.key === props.location.key;
    });
    var exists = index !== -1;
    var position = exists ? index : state.locations.length;
    var location = _extends({}, props.location, {
      position: position
    });
    var locations = exists ? state.locations : [].concat(state.locations, [location]);
    var lastLocation = _extends({}, state.lastLocation, (_extends2 = {}, _extends2[location.pathname] = location, _extends2));

    return {
      locations: locations,
      lastLocation: lastLocation,
      position: position
    };
  }
}, _temp2);


export default withRouter(withStyles(styles)(Breadcrumb));