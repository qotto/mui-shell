"use strict";

exports.__esModule = true;
exports.routeType = exports.firstWhere = undefined;

var _propTypes = require("prop-types");

var firstWhere = exports.firstWhere = function firstWhere(array, lambda) {
  return function (elt, index) {
    return array.findIndex(function (elt2) {
      return lambda(elt, elt2);
    }) === index;
  };
};

var routeShape = {
  path: _propTypes.string.isRequired,
  component: _propTypes.func.isRequired,
  label: _propTypes.string.isRequired,
  breadcrumb: _propTypes.func,
  sharable: _propTypes.bool,
  fullscreen: _propTypes.bool,
  disableCountrySwitch: _propTypes.bool,
  menu: (0, _propTypes.shape)({
    icon: _propTypes.object.isRequired,
    exact: _propTypes.bool
  })
};

routeShape.children = (0, _propTypes.arrayOf)((0, _propTypes.shape)(routeShape));
var routeType = exports.routeType = (0, _propTypes.shape)(routeShape);