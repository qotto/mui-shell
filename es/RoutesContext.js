var _class, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { withRouter, matchPath } from "react-router-dom";

var RoutesContext = React.createContext({
  routes: null,
  flatRoutes: null,
  currentRoute: null,
  currentMatch: null,
  lastRoute: null,
  lastMatch: null,
  parentRoutes: null,
  location: null
});

export default RoutesContext;

var getExactMatch = function getExactMatch(pathname) {
  return function (route) {
    return matchPath(pathname, { path: route.path, exact: true });
  };
};

var flatten = function flatten(array) {
  return array.reduce(function (acc, value) {
    if (value === null || value === undefined) {
      return acc;
    } else if (Array.isArray(value)) {
      return [].concat(acc, value);
    } else {
      return [].concat(acc, [value]);
    }
  }, []);
};

var flattenRoutes = function flattenRoutes(routes) {
  return [_extends({}, routes, {
    path: routes.fullPath
  })].concat(flatten((routes.children || []).map(flattenRoutes)));
};

var enhanceRoute = function enhanceRoute(routes) {
  var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var parentRoute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var enhancedRoute = _extends({}, routes, {
    fullPath: parentPath + routes.path,
    depth: depth,
    parentRoute: parentRoute,
    children: routes.children || []
  });
  if (routes.children) {
    enhancedRoute.children = routes.children.map(function (child) {
      return enhanceRoute(child, parentPath + routes.path, depth + 1, enhancedRoute);
    });
  }
  return enhancedRoute;
};

var getParentRoutes = function getParentRoutes(child) {
  if (child && child.parentRoute) {
    return [child.parentRoute].concat(getParentRoutes(child.parentRoute, child));
  } else {
    return [];
  }
};

var RoutesProvider = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(RoutesProvider, _React$PureComponent);

  function RoutesProvider() {
    var _temp, _this, _ret;

    _classCallCheck(this, RoutesProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RoutesProvider.prototype.render = function render() {
    return React.createElement(
      RoutesContext.Provider,
      { value: this.state },
      this.props.children
    );
  };

  return RoutesProvider;
}(React.PureComponent), _class.getDerivedStateFromProps = function (_ref, state) {
  var routes = _ref.routes,
      location = _ref.location;

  var enhancedRoutes = enhanceRoute(routes);
  var flatRoutes = flattenRoutes(enhancedRoutes);
  var currentRoute = flatRoutes.find(getExactMatch(location.pathname));
  var currentMatch = currentRoute && getExactMatch(location.pathname)(currentRoute);
  var parentRoutes = getParentRoutes(currentRoute);
  return {
    routes: enhancedRoutes,
    flatRoutes: flatRoutes,
    currentRoute: currentRoute,
    currentMatch: currentMatch,
    parentRoutes: parentRoutes,
    lastRoute: state.currentRoute,
    lastMatch: state.currentMatch,
    location: location
  };
}, _temp2);


RoutesProvider = withRouter(RoutesProvider);

export { RoutesProvider };