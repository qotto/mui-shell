"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("CustomAppBar", function () {
  var props = void 0;
  var component = void 0;
  var customAppBar = function customAppBar() {
    if (!component) {
      component = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
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