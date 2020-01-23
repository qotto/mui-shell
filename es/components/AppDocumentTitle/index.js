import React, { useEffect } from "react";

import RoutesContext from "../../RoutesContext";

var DocumentTitle = function DocumentTitle(_ref) {
  var title = _ref.title;

  useEffect(function () {
    document.title = title;
  });

  return null;
};

var AppDocumentTitle = function AppDocumentTitle(_ref2) {
  var documentTitleFormatter = _ref2.documentTitleFormatter,
      appTitle = _ref2.appTitle;
  return React.createElement(
    RoutesContext.Consumer,
    null,
    function (_ref3) {
      var currentRoute = _ref3.currentRoute;
      return currentRoute && React.createElement(DocumentTitle, {
        title: documentTitleFormatter ? documentTitleFormatter(currentRoute) : currentRoute.label + " - " + appTitle
      });
    }
  );
};

export default AppDocumentTitle;