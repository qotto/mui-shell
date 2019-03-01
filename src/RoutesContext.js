import React from "react";
import { withRouter, matchPath } from "react-router-dom";

const RoutesContext = React.createContext();

export default RoutesContext;

const getExactMatch = pathname => route =>
  matchPath(pathname, { path: route.path, exact: true });

const flatten = array =>
  array.reduce((acc, value) => {
    if (value === null || value === undefined) {
      return acc;
    } else if (Array.isArray(value)) {
      return [...acc, ...value];
    } else {
      return [...acc, value];
    }
  }, []);

const flattenRoutes = routes => {
  return [
    {
      ...routes,
      path: routes.fullPath
    },
    ...flatten((routes.children || []).map(flattenRoutes))
  ];
};

const enhanceRoute = (
  routes,
  parentPath = "",
  depth = 0,
  parentRoute = null
) => {
  const enhancedRoute = {
    ...routes,
    fullPath: parentPath + routes.path,
    depth,
    parentRoute,
    children: routes.children || []
  };
  if (routes.children) {
    enhancedRoute.children = routes.children.map(child =>
      enhanceRoute(child, parentPath + routes.path, depth + 1, enhancedRoute)
    );
  }
  return enhancedRoute;
};

const getParentRoutes = child => {
  if (child && child.parentRoute) {
    return [child.parentRoute, ...getParentRoutes(child.parentRoute, child)];
  } else {
    return [];
  }
};

class RoutesProvider extends React.PureComponent {
  state = {
    routes: null,
    flatRoutes: null,
    currentRoute: null,
    currentMatch: null,
    lastRoute: null,
    lastMatch: null,
    parentRoutes: null,
    location: null,
    locations: [],
    lastLocation: {},
    position: null
  };

  static getDerivedStateFromProps = ({ routes, location }, state) => {
    const enhancedRoutes = enhanceRoute(routes);
    const flatRoutes = flattenRoutes(enhancedRoutes);
    const currentRoute = flatRoutes.find(getExactMatch(location.pathname));
    const currentMatch =
      currentRoute && getExactMatch(location.pathname)(currentRoute);
    const parentRoutes = getParentRoutes(currentRoute);
    const index = state.locations.findIndex(l => l.key === location.key);
    const exists = index !== -1;
    const position = exists ? index : state.locations.length;
    const newLocation = {
      ...location,
      position
    };
    const locations = exists
      ? state.locations
      : [...state.locations, newLocation];
    let lastLocation = state.lastLocation;
    if (currentRoute) {
      lastLocation = {
        ...lastLocation,
        [currentRoute.label]: newLocation
      };
    }
    return {
      routes: enhancedRoutes,
      flatRoutes,
      currentRoute,
      currentMatch,
      parentRoutes,
      lastRoute: state.currentRoute,
      lastMatch: state.currentMatch,
      location,
      locations,
      lastLocation,
      position
    };
  };

  render() {
    return (
      <RoutesContext.Provider value={this.state}>
        {this.props.children}
      </RoutesContext.Provider>
    );
  }
}

RoutesProvider = withRouter(RoutesProvider);

export { RoutesProvider };
