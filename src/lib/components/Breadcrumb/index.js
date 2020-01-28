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
    minHeight: "36px",
    display: "flex"
  },
  breadcrumbButton: {
    paddingRight: 0,
    paddingLeft: 0,
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
    },
    flex: 1
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

const BreadcrumbItem = ({ match, route, classes, breadcrumbFormatter, children, lastLocation }) => {
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
        mini="true"
        disabled={match.isExact}
        component={Link}
        to={lastLocation[route.label] || match.url}
        color={match.isExact ? "default" : "primary"}
        className={classes.breadcrumbButton}
        classes={{ disabled: classes.disabled }}
      >
        {BreadcrumbComponent ? <BreadcrumbComponent match={match} /> : breadcrumbFormatter ? breadcrumbFormatter(route) : route.label}
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

const BreadcrumbRoute = ({ url = "", disabled = false, location, route, match, ...props }) => {
  let firstMatch = false;

  return (
    <TransitionGroup component={null}>
      {!disabled && (
        <CSSTransition key={route.label} unmountOnExit classNames="bcslide" timeout={200}>
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
    mini="true"
    disabled={position === 0}
    onClick={() => history.goBack()}
    color={position === 0 ? "default" : "primary"}
    className={classes.goBackButton}
  >
    <ArrowBackIcon />
  </Button>
);

const isIOS = navigator && navigator.platform && navigator.platform.match(/iPhone|iPod|iPad/);

class Breadcrumb extends PureComponent {
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
    const { classes, location, history, match, routes, lastLocation, position, currentRoute, rightBreadcrumbRender, ...props } = this.props;

    return (
      <RootRef
        rootRef={elt => {
          this.appBarElt = elt;
        }}
      >
        <AppBar position="static" color="default" className={classes.breadcrumb}>
          <div className={classes.breadcrumbContainer}>
            {isIOS && <BackButton classes={classes} location={location} position={position} history={history} />}
            <BreadcrumbRoute
              route={routes}
              match={matchPath(location.pathname, { path: routes.path })}
              classes={classes}
              location={location}
              lastLocation={lastLocation}
              {...props}
            />
            {rightBreadcrumbRender && rightBreadcrumbRender(currentRoute)}
          </div>
        </AppBar>
      </RootRef>
    );
  }
}

const BreadcrumbWrapper = props => (
  <RoutesContext.Consumer>
    {({ routes, currentRoute, lastLocation, position }) => (
      <Breadcrumb routes={routes} currentRoute={currentRoute} lastLocation={lastLocation} position={position} {...props} />
    )}
  </RoutesContext.Consumer>
);

export default withRouter(withStyles(styles)(BreadcrumbWrapper));
