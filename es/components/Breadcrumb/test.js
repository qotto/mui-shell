import React from "react";
import { mount } from "enzyme";
import Button from "@material-ui/core/Button";
import { MemoryRouter } from "react-router-dom";

import Breadcrumb from "./";
import RoutesContext from "../../RoutesContext";

describe("Breadcrumb", function () {
  var props = void 0;
  var context = void 0;
  var path = void 0;
  var component = void 0;
  var breadcrumb = function breadcrumb() {
    if (!component) {
      component = mount(React.createElement(
        MemoryRouter,
        { initialEntries: [path] },
        React.createElement(
          RoutesContext.Provider,
          { value: context },
          React.createElement(Breadcrumb, props)
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
          return React.createElement("span", null);
        },
        breadcrumb: function breadcrumb() {
          return React.createElement("span", null);
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
      return React.createElement("span", null);
    };
    var RouteBreadcrumb = function RouteBreadcrumb() {
      return React.createElement("span", null);
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
        var button = breadcrumbItem.parents().find(Button);
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
        var button = breadcrumbItem.parents(Button);
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