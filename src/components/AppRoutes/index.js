import React, { PureComponent } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";

import { FullscreenScene, ScrollableScene } from "../";

import RoutesContext from "../../RoutesContext";

const Scene = ({ route, passedProps, ...transitionProps }) => {
  const SceneComponent = route.component;
  const SceneWrapper = route.fullscreen ? FullscreenScene : ScrollableScene;

  return (
    <SceneWrapper {...transitionProps}>
      <SceneComponent {...passedProps} />
    </SceneWrapper>
  );
};

const getAnimation = (matchingRoute, lastMatchingRoute) => {
  const depth = matchingRoute ? matchingRoute.depth : 0;
  const lastDepth = lastMatchingRoute ? lastMatchingRoute.depth : 0;
  return depth >= lastDepth ? "forward" : "backward";
};

const NoMatchScene = ({ routes }) => {
  const NoMatchComponent = routes.noMatchComponent;
  return NoMatchComponent ? <NoMatchComponent /> : null;
};

class AppRoutes extends PureComponent {
  transitionChildFactory = classNames => child => {
    return React.cloneElement(child, {
      classNames
    });
  };

  render() {
    const { ...sceneProps } = this.props;

    return (
      <RoutesContext.Consumer>
        {({ currentRoute, currentMatch, lastRoute, routes }) => {
          const passedProps = {
            ...sceneProps,
            match: currentMatch
          };
          const animationClassNames = `scene-${getAnimation(
            currentRoute,
            lastRoute
          )}`;
          if (!currentRoute) {
            return <NoMatchScene routes={routes} />;
          }
          if (currentRoute.fullscreen) {
            return <Scene route={currentRoute} passedProps={passedProps} />;
          }
          return (
            <TransitionGroup
              component={null}
              childFactory={this.transitionChildFactory(animationClassNames)}
            >
              <CSSTransition
                classNames={animationClassNames}
                key={currentRoute.label}
                timeout={200}
              >
                <Scene route={currentRoute} passedProps={passedProps} />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      </RoutesContext.Consumer>
    );
  }
}

export default withRouter(AppRoutes);
