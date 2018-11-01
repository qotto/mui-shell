import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link, withRouter, matchPath } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";

import { routeType } from "../../utils";
import RoutesContext from "../../RoutesContext";

const styles = theme => ({
  breadcrumb: {
    overflowX: "auto"
  },
  breadcrumbContainer: {
    paddingLeft: "8px",
    whiteSpace: "nowrap",
    position: "relative",
    minHeight: "36px"
  },
  breadcrumbButton: {
    paddingRight: 0,
    paddingLeft: 0,
    height: "24px",
    minWidth: "auto",
    "&$disabled": {
      color: theme.palette.text.primary,
      paddingRight: "24px"
    }
  },
  breadcrumbItem: {
    "&.bcslide-enter": {
      opacity: "0",
      transform: "translateX(-20px)"
    },
    "&.bcslide-enter.bcslide-enter-active": {
      position: "absolute",
      opacity: 1,
      transform: "translateX(0)",
      transitionProperty: "transform, opacity",
      transitionDuration: "0.2s",
      transitionTimingFunction: "ease"
    },
    "&.bcslide-exit": {
      opacity: 1,
      transform: "translateX(0)"
    },
    "&.bcslide-exit.bcslide-exit-active": {
      position: "absolute",
      opacity: 0,
      transform: "translateX(-20px)",
      transitionProperty: "transform, opacity",
      transitionDuration: "0.2s",
      transitionTimingFunction: "ease"
    }
  },
  goBackButton: {
    padding: "0 8px",
    height: "24px",
    minWidth: "auto"
  },
  disabled: {},
  hide: {
    visibility: "hidden"
  },
  shareButton: {
    height: "36px",
    width: "36px",
    padding: "6px"
  }
});

const BreadcrumbItem = ({
  match,
  route,
  classes,
  breadcrumbFormatter,
  children,
  lastLocation
}) => {
  const BreadcrumbComponent = route.breadcrumb;
  if (!match) {
    return null;
  }

  return (
    <span
      className={classNames(classes.breadcrumbItem, {
        [classes.disabled]: match.isExact
      })}
    >
      <Button
        mini
        disabled={match.isExact}
        component={Link}
        to={lastLocation[match.url || "/"] || match.url}
        color={match.isExact ? "default" : "primary"}
        className={classes.breadcrumbButton}
        classes={{ disabled: classes.disabled }}
      >
        {BreadcrumbComponent ? (
          <BreadcrumbComponent match={match} />
        ) : breadcrumbFormatter ? (
          breadcrumbFormatter(route)
        ) : (
          route.label
        )}
        {!match.isExact && <KeyboardArrowRightIcon />}
      </Button>
      {children}
    </span>
  );
};

BreadcrumbItem.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired
  }),
  route: routeType.isRequired
};

const BreadcrumbRoute = ({
  url = "",
  disabled = false,
  location,
  route,
  match,
  ...props
}) => {
  let firstMatch = false;

  return (
    <TransitionGroup component={null}>
      {!disabled && (
        <CSSTransition
          key={route.label}
          unmountOnExit
          classNames="bcslide"
          timeout={200}
        >
          <BreadcrumbItem match={match} route={route} {...props}>
            {(route.children || []).map(child => {
              const childMatch = matchPath(location.pathname, {
                path: url + route.path + child.path
              });

              return (
                <BreadcrumbRoute
                  key={url + route.path + child.path}
                  url={url + route.path}
                  disabled={!childMatch || Boolean(firstMatch++)}
                  location={location}
                  route={child}
                  match={childMatch}
                  {...props}
                />
              );
            })}
          </BreadcrumbItem>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

const BackButton = ({ position, history, classes }) => (
  <Button
    mini
    disabled={position === 0}
    onClick={() => history.goBack()}
    color={position === 0 ? "default" : "primary"}
    className={classes.goBackButton}
  >
    <ArrowBackIcon />
  </Button>
);

const isIOS =
  navigator &&
  navigator.platform &&
  navigator.platform.match(/iPhone|iPod|iPad/);

class Breadcrumb extends PureComponent {
  state = {
    locations: [],
    lastLocation: {},
    position: null
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.location !== state.locations[state.position]) {
      const index = state.locations.findIndex(
        l => l.key === props.location.key
      );
      const exists = index !== -1;
      const position = exists ? index : state.locations.length;
      const location = {
        ...props.location,
        position
      };
      const locations = exists
        ? state.locations
        : [...state.locations, location];
      const lastLocation = {
        ...state.lastLocation,
        [location.pathname]: location
      };

      return {
        locations,
        lastLocation,
        position
      };
    }
  };

  scrollRight = () => {
    if (this.appBarElt.scrollBy) {
      this.appBarElt.scrollBy({
        left: 2147483647,
        behavior: "smooth"
      });
      //this.appBarElt.scrollLeft = 2147483647;
    }
  };

  componentDidMount() {
    this.scrollRight();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.scrollRight();
    }
  }

  render() {
    const { classes, location, history, match, ...props } = this.props;
    const { lastLocation, position } = this.state;

    return (
      <RootRef
        rootRef={elt => {
          this.appBarElt = elt;
        }}
      >
        <AppBar
          position="static"
          color="default"
          className={classes.breadcrumb}
        >
          <div className={classes.breadcrumbContainer}>
            {isIOS && (
              <BackButton
                classes={classes}
                location={location}
                position={position}
                history={history}
              />
            )}
            <RoutesContext.Consumer>
              {({ routes }) => (
                <BreadcrumbRoute
                  route={routes}
                  match={matchPath(location.pathname, { path: routes.path })}
                  classes={classes}
                  location={location}
                  lastLocation={lastLocation}
                  {...props}
                />
              )}
            </RoutesContext.Consumer>
          </div>
        </AppBar>
      </RootRef>
    );
  }
}

export default withRouter(withStyles(styles)(Breadcrumb));
