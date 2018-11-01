"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = require("react-document-title");

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _RoutesContext = require("../../RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppDocumentTitle = function AppDocumentTitle(_ref) {
  var documentTitleFormatter = _ref.documentTitleFormatter,
      appTitle = _ref.appTitle;
  return _react2.default.createElement(
    _RoutesContext2.default.Consumer,
    null,
    function (_ref2) {
      var currentRoute = _ref2.currentRoute;
      return currentRoute && _react2.default.createElement(_reactDocumentTitle2.default, {
        title: documentTitleFormatter ? documentTitleFormatter(currentRoute) : currentRoute.label + " - " + appTitle
      });
    }
  );
};

exports.default = AppDocumentTitle;
module.exports = exports["default"];