import React from "react";
import { mount } from "enzyme";
import Button from "@material-ui/core/Button";
import { MemoryRouter } from "react-router-dom";

import Breadcrumb from "./";
import RoutesContext from "../../RoutesContext";

describe("Breadcrumb", () => {
  let props;
  let context;
  let path;
  let component;
  const breadcrumb = () => {
    if (!component) {
      component = mount(
        <MemoryRouter initialEntries={[path]}>
          <RoutesContext.Provider value={context}>
            <Breadcrumb {...props} />
          </RoutesContext.Provider>
        </MemoryRouter>
      );
    }
    return component;
  };

  beforeEach(() => {
    path = "";
    context = {
      routes: {
        path: "",
        label: "",
        component: () => <span />,
        breadcrumb: () => <span />
      }
    };
    props = {};
    component = undefined;
  });

  it("renders with minimum props without crashing", () => {
    expect(breadcrumb().length).toBe(1);
  });

  describe("when a route is provided", () => {
    const RouteComponent = () => <span />;
    const RouteBreadcrumb = () => <span />;

    beforeEach(() => {
      context.routes = {
        path: "/route",
        label: "routeLabel",
        component: RouteComponent,
        breadcrumb: RouteBreadcrumb
      };
    });

    describe("on exact route", () => {
      beforeEach(() => {
        path = context.routes.path;
      });

      it("renders breadcrumb", () => {
        const breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(1);
      });

      it("disables breadcrumb button", () => {
        const breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        const button = breadcrumbItem.parents().find(Button);
        expect(button.props().disabled).toBeTruthy();
      });
    });

    describe("on any other matching path", () => {
      beforeEach(() => {
        path = context.routes.path + "/azeaze";
      });

      it("renders breadcrumb", () => {
        const breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(1);
      });

      it("enables breadcrumb button", () => {
        const breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        const button = breadcrumbItem.parents(Button);
        expect(button.props().disabled).toBeFalsy();
      });
    });

    describe("on a completely different path", () => {
      beforeEach(() => {
        path = "/azeaze";
      });

      it("does not render breadcrumb", () => {
        const breadcrumbItem = breadcrumb().find(RouteBreadcrumb);
        expect(breadcrumbItem.length).toBe(0);
      });
    });
  });
});
