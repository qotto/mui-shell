var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from "react";
import { CSSTransition } from "react-transition-group";

var Animate = (_temp2 = _class = function (_PureComponent) {
  _inherits(Animate, _PureComponent);

  function Animate() {
    var _temp, _this, _ret;

    _classCallCheck(this, Animate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      lastIn: null,
      lastPassedProps: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Animate.prototype.render = function render() {
    var lastPassedProps = this.state.lastPassedProps;

    var _props = this.props,
        children = _props.children,
        passedProps = _props.passedProps,
        transitionProps = _objectWithoutProperties(_props, ["children", "passedProps"]);

    var usedProps = transitionProps.in ? passedProps : lastPassedProps;

    return React.createElement(
      CSSTransition,
      _extends({ unmountOnExit: true }, transitionProps),
      children(usedProps)
    );
  };

  return Animate;
}(PureComponent), _class.getDerivedStateFromProps = function (props, state) {
  var lastIn = state.lastIn;
  var inAnimation = props.in,
      passedProps = props.passedProps;


  if (!inAnimation && lastIn) {
    return null;
  }
  return {
    lastIn: inAnimation,
    lastPassedProps: passedProps
  };
}, _temp2);


export default Animate;