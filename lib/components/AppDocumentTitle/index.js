"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RoutesContext = require("../../RoutesContext");

var _RoutesContext2 = _interopRequireDefault(_RoutesContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentTitle = function DocumentTitle(_ref) {
  var title = _ref.title;

  (0, _react.useEffect)(function () {
    document.title = title;
  });

  return null;
};

var AppDocumentTitle = function AppDocumentTitle(_ref2) {
  var documentTitleFormatter = _ref2.documentTitleFormatter,
      appTitle = _ref2.appTitle;
  return _react2.default.createElement(
    _RoutesContext2.default.Consumer,
    null,
    function (_ref3) {
      var currentRoute = _ref3.currentRoute;
      return currentRoute && _react2.default.createElement(DocumentTitle, {
        title: documentTitleFormatter ? documentTitleFormatter(currentRoute) : currentRoute.label + " - " + appTitle
      });
    }
  );
};

exports.default = AppDocumentTitle;
module.exports = exports["default"];