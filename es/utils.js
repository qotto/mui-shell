import { shape, object, string, bool, func, arrayOf } from "prop-types";

export var firstWhere = function firstWhere(array, lambda) {
  return function (elt, index) {
    return array.findIndex(function (elt2) {
      return lambda(elt, elt2);
    }) === index;
  };
};

var routeShape = {
  path: string.isRequired,
  component: func.isRequired,
  label: string.isRequired,
  breadcrumb: func,
  sharable: bool,
  fullscreen: bool,
  disableCountrySwitch: bool,
  menu: shape({
    icon: object.isRequired,
    exact: bool
  })
};

routeShape.children = arrayOf(shape(routeShape));
export var routeType = shape(routeShape);