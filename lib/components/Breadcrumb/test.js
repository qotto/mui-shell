"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _reactRouterDom = require("react-router-dom");

var _ = require("./");

var _2 = _interopRequireDefault(_);

var _RoutesContext = require("../../RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Breadcrumb", function () {
  var props = void 0;
  var context = void 0;
  var path = void 0;
  var component = void 0;
  var breadcrumb = function breadcrumb() {
    if (!component) {
      component = (0, _enzyme.mount)(_react2.default.createElement(
        _reactRouterDom.MemoryRouter,
        { initialEntries: [path] },
        _react2.default.createElement(
          _RoutesContext2.default.Provider,
          { value: context },
          _react2.default.createElement(_2.default, props)
        )
      ));
    }
    return component;
  };

  beforeEach(function () {
    path = "";
    context = {
      routes: {
        path: "",
        label: "",
        component: function component() {
          return _react2.default.createElement("span", null);
        },
        breadcrumb: function breadcrumb() {
          return _react2.default.createElement("span", null);
        }
      }
    };
    props = {};
    component = undefined;
  });

  it("renders with minimum props without crashing", function () {
    expect(breadcrumb().length).toBe(1);
  });

  describe("when a route is provided", function () {
    var RouteComponent = function RouteComponent() {
      return _react2.default.createElement("span", null);
    };
    var RouteBreadcrumb = function RouteBreadcrumb() {
      return _react2.default.createElement("span", null);
    };

    beforeEach(function () {
      context.routes = {
        path: "/route",
        label: "routeLabel",
        component: RouteComponent,
        breadcrumb: RouteBreadcrumb
      };
    });

    describe("on exact route", function () {
      beforeEach(function () {
        path = context.routes.path;
      });

      it("renders breadcrumb", function () {
        var breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(1);
      });

      it("disables breadcrumb button", function () {
        var breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        var button = breadcrumbItem.parents().find(_Button2.default);
        expect(button.props().disabled).toBeTruthy();
      });
    });

    describe("on any other matching path", function () {
      beforeEach(function () {
        path = context.routes.path + "/azeaze";
      });

      it("renders breadcrumb", function () {
        var breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(1);
      });

      it("enables breadcrumb button", function () {
        var breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        var button = breadcrumbItem.parents(_Button2.default);
        expect(button.props().disabled).toBeFalsy();
      });
    });

    describe("on a completely different path", function () {
      beforeEach(function () {
        path = "/azeaze";
      });

      it("does not render breadcrumb", function () {
        var breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(0);
      });
    });
  });
});