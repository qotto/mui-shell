var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { PureComponent } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";

import { FullscreenScene, ScrollableScene } from "../";

import RoutesContext from "../../RoutesContext";

var Scene = function Scene(_ref) {
  var route = _ref.route,
      passedProps = _ref.passedProps,
      transitionProps = _objectWithoutProperties(_ref, ["route", "passedProps"]);

  var SceneComponent = route.component;
  var SceneWrapper = route.fullscreen ? FullscreenScene : ScrollableScene;

  return React.createElement(
    SceneWrapper,
    transitionProps,
    React.createElement(SceneComponent, passedProps)
  );
};

var getAnimation = function getAnimation(matchingRoute, lastMatchingRoute) {
  var depth = matchingRoute ? matchingRoute.depth : 0;
  var lastDepth = lastMatchingRoute ? lastMatchingRoute.depth : 0;
  return depth >= lastDepth ? "forward" : "backward";
};

var NoMatchScene = function NoMatchScene(_ref2) {
  var routes = _ref2.routes;

  var NoMatchComponent = routes.noMatchComponent;
  return NoMatchComponent ? React.createElement(NoMatchComponent, null) : null;
};

var AppRoutes = function (_PureComponent) {
  _inherits(AppRoutes, _PureComponent);

  function AppRoutes() {
    var _temp, _this, _ret;

    _classCallCheck(this, AppRoutes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.transitionChildFactory = function (classNames) {
      return function (child) {
        return React.cloneElement(child, {
          classNames: classNames
        });
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AppRoutes.prototype.render = function render() {
    var _this2 = this;

    var sceneProps = _objectWithoutProperties(this.props, []);

    return React.createElement(
      RoutesContext.Consumer,
      null,
      function (_ref3) {
        var currentRoute = _ref3.currentRoute,
            currentMatch = _ref3.currentMatch,
            lastRoute = _ref3.lastRoute,
            routes = _ref3.routes;

        var passedProps = _extends({}, sceneProps, {
          match: currentMatch
        });
        var animationClassNames = "scene-" + getAnimation(currentRoute, lastRoute);
        if (!currentRoute) {
          return React.createElement(NoMatchScene, { routes: routes });
        }
        if (currentRoute.fullscreen) {
          return React.createElement(Scene, { route: currentRoute, passedProps: passedProps });
        }
        return React.createElement(
          TransitionGroup,
          {
            component: null,
            childFactory: _this2.transitionChildFactory(animationClassNames)
          },
          React.createElement(
            CSSTransition,
            {
              classNames: animationClassNames,
              key: currentRoute.label,
              timeout: 200
            },
            React.createElement(Scene, { route: currentRoute, passedProps: passedProps })
          )
        );
      }
    );
  };

  return AppRoutes;
}(PureComponent);

export default withRouter(AppRoutes);