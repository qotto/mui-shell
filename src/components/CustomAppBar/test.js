import React from "react";
import { mount } from "enzyme";

import CustomAppBar from "./";

describe("CustomAppBar", () => {
  let props;
  let component;
  const customAppBar = () => {
    if (!component) {
      component = mount(<CustomAppBar {...props} />);
    }
    return component;
  };

  beforeEach(() => {
    props = {
      openMenu: jest.fn()
    };
    component = undefined;
  });

  it("renders with minimum props without crashing", () => {
    expect(customAppBar().length).toBe(1);
  });

  describe("when leftAppBarComponent is omitted and appTitle is set", () => {
    beforeEach(() => {
      props.appTitle = "ZerApp";
    });

    it("shows app title in appBar", () => {
      const text = customAppBar().text();
      expect(text).toContain(props.appTitle);
    });
  });
});
