import React from "react";
import { mount } from "enzyme";

import CustomAppBar from "./";

describe("CustomAppBar", function () {
  var props = void 0;
  var component = void 0;
  var customAppBar = function customAppBar() {
    if (!component) {
      component = mount(React.createElement(CustomAppBar, props));
    }
    return component;
  };

  beforeEach(function () {
    props = {
      openMenu: jest.fn()
    };
    component = undefined;
  });

  it("renders with minimum props without crashing", function () {
    expect(customAppBar().length).toBe(1);
  });

  describe("when leftAppBarComponent is omitted and appTitle is set", function () {
    beforeEach(function () {
      props.appTitle = "ZerApp";
    });

    it("shows app title in appBar", function () {
      var text = customAppBar().text();
      expect(text).toContain(props.appTitle);
    });
  });
});