import { shape, object, string, bool, func, arrayOf } from "prop-types";

export const firstWhere = (array, lambda) => (elt, index) => array.findIndex(elt2 => lambda(elt, elt2)) === index;

const routeShape = {
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
export const routeType = shape(routeShape);
