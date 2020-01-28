import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { CustomAppBar, Breadcrumb } from "../";

const scrollThreshold = 100;

const styles = theme => ({
  appBar: {
    position: "initial"
  },
  navbar: {
    zIndex: 1000
  },
  staticNavbar: {
    position: "static"
  },
  stickyNavbar: {
    position: "sticky",
    top: 0,
    transition: "transform 0.3s ease",
    transform: "translate3d(0, 0, 0)"
  },
  hiddenStickyNavbar: {
    transform: "translate3d(0, calc(-100% - 10px), 0)"
  },
  blockTransition: {
    transition: "none"
  }
});

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.offsetDown = 0;
    this.offsetUp = 0;
    this.lastScrollY = 0;

    this.state = {
      navbar: "static",
      blockTransition: true
    };
  }

  componentDidMount() {
    this.navbarHeight = this.elt.clientHeight;
    if (window) {
      window.addEventListener("scroll", this.onAppScroll);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("scroll", this.onAppScroll);
    }
  }

  setNavbar = (navbar, blockTransition) => {
    this.setState({
      navbar,
      blockTransition: Boolean(blockTransition)
    });
  };

  onAppScroll = e => {
    const scrollY = window.scrollY;
    const { navbar } = this.state;
    const offset = this.lastScrollY - scrollY;
    const isMovingUp = offset > 0;
    if (isMovingUp) {
      this.offsetUp += offset;
      this.offsetDown = 0;
    } else {
      // is moving down
      this.offsetDown -= offset;
      this.offsetUp = 0;
    }
    this.lastScrollY = scrollY;

    const isBellowThreshold = scrollY > this.navbarHeight + scrollThreshold;
    const isUp = this.offsetUp > scrollThreshold;
    const isDown = this.offsetDown > scrollThreshold;
    const isAtTop = scrollY === 0;
    if (navbar !== "static" && isAtTop) {
      // we scrolled to the top
      this.setNavbar("static");
    } else if (navbar === "hidden" && isMovingUp && !isBellowThreshold) {
      // we're srolling to the top but navbar is hidden
      this.setNavbar("static");
    } else if (navbar === "static" && isDown && isBellowThreshold) {
      // we're scrolling down and navbar needs to detatch
      this.setNavbar("hidden", "blockTransition");
    } else if (navbar === "hidden" && isUp) {
      // we're scrolling up and navbar needs to popup from top
      this.setNavbar("sticky");
    } else if (navbar === "sticky" && isDown) {
      // we're scrolling down and navbar needs to hide
      this.setNavbar("hidden");
    }
  };

  render() {
    const { classes, breadcrumbFormatter, rightBreadcrumbRender, ...appBarProps } = this.props;
    const { navbar, blockTransition } = this.state;

    const navbarClasses = [
      classes.navbar,
      navbar === "static" ? classes.staticNavbar : classes.stickyNavbar,
      navbar === "hidden" ? classes.hiddenStickyNavbar : "",
      blockTransition ? classes.blockTransition : ""
    ];

    return (
      <div className={navbarClasses.join(" ")} ref={elt => (this.elt = elt)}>
        <CustomAppBar className={classes.appBar} {...appBarProps} />
        <Breadcrumb breadcrumbFormatter={breadcrumbFormatter} rightBreadcrumbRender={rightBreadcrumbRender} />
      </div>
    );
  }
}

Navbar.propTypes = {
  breadcrumbFormatter: PropTypes.any
};

export default withStyles(styles)(Navbar);
