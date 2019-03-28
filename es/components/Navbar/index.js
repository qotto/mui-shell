var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { CustomAppBar, Breadcrumb } from "../";

var scrollThreshold = 100;

var styles = function styles(theme) {
  return {
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
  };
};

var Navbar = function (_React$PureComponent) {
  _inherits(Navbar, _React$PureComponent);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.setNavbar = function (navbar, blockTransition) {
      _this.setState({
        navbar: navbar,
        blockTransition: Boolean(blockTransition)
      });
    };

    _this.onAppScroll = function (e) {
      var scrollY = window.scrollY;
      var navbar = _this.state.navbar;

      var offset = _this.lastScrollY - scrollY;
      var isMovingUp = offset > 0;
      if (isMovingUp) {
        _this.offsetUp += offset;
        _this.offsetDown = 0;
      } else {
        // is moving down
        _this.offsetDown -= offset;
        _this.offsetUp = 0;
      }
      _this.lastScrollY = scrollY;

      var isBellowThreshold = scrollY > _this.navbarHeight + scrollThreshold;
      var isUp = _this.offsetUp > scrollThreshold;
      var isDown = _this.offsetDown > scrollThreshold;
      var isAtTop = scrollY === 0;
      if (navbar !== "static" && isAtTop) {
        // we scrolled to the top
        _this.setNavbar("static");
      } else if (navbar === "hidden" && isMovingUp && !isBellowThreshold) {
        // we're srolling to the top but navbar is hidden
        _this.setNavbar("static");
      } else if (navbar === "static" && isDown && isBellowThreshold) {
        // we're scrolling down and navbar needs to detatch
        _this.setNavbar("hidden", "blockTransition");
      } else if (navbar === "hidden" && isUp) {
        // we're scrolling up and navbar needs to popup from top
        _this.setNavbar("sticky");
      } else if (navbar === "sticky" && isDown) {
        // we're scrolling down and navbar needs to hide
        _this.setNavbar("hidden");
      }
    };

    _this.offsetDown = 0;
    _this.offsetUp = 0;
    _this.lastScrollY = 0;

    _this.state = {
      navbar: "static",
      blockTransition: true
    };
    return _this;
  }

  Navbar.prototype.componentDidMount = function componentDidMount() {
    this.navbarHeight = this.elt.clientHeight;
    if (window) {
      window.addEventListener("scroll", this.onAppScroll);
    }
  };

  Navbar.prototype.componentWillUnmount = function componentWillUnmount() {
    if (window) {
      window.removeEventListener("scroll", this.onAppScroll);
    }
  };

  Navbar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        classes = _props.classes,
        breadcrumbFormatter = _props.breadcrumbFormatter,
        rightBreadcrumbRender = _props.rightBreadcrumbRender,
        appBarProps = _objectWithoutProperties(_props, ["classes", "breadcrumbFormatter", "rightBreadcrumbRender"]);

    var _state = this.state,
        navbar = _state.navbar,
        blockTransition = _state.blockTransition;


    var navbarClasses = [classes.navbar, navbar === "static" ? classes.staticNavbar : classes.stickyNavbar, navbar === "hidden" ? classes.hiddenStickyNavbar : "", blockTransition ? classes.blockTransition : ""];

    return React.createElement(
      "div",
      { className: navbarClasses.join(" "), ref: function ref(elt) {
          return _this2.elt = elt;
        } },
      React.createElement(CustomAppBar, _extends({ className: classes.appBar }, appBarProps)),
      React.createElement(Breadcrumb, {
        breadcrumbFormatter: breadcrumbFormatter,
        rightBreadcrumbRender: rightBreadcrumbRender
      })
    );
  };

  return Navbar;
}(React.PureComponent);

Navbar.propTypes = process.env.NODE_ENV !== "production" ? {
  breadcrumbFormatter: PropTypes.any
} : {};

export default withStyles(styles)(Navbar);