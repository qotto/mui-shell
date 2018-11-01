import React from "react";
import DocumentTitle from "react-document-title";

import RoutesContext from "../../RoutesContext";

var AppDocumentTitle = function AppDocumentTitle(_ref) {
  var documentTitleFormatter = _ref.documentTitleFormatter,
      appTitle = _ref.appTitle;
  return React.createElement(
    RoutesContext.Consumer,
    null,
    function (_ref2) {
      var currentRoute = _ref2.currentRoute;
      return currentRoute && React.createElement(DocumentTitle, {
        title: documentTitleFormatter ? documentTitleFormatter(currentRoute) : currentRoute.label + " - " + appTitle
      });
    }
  );
};

export default AppDocumentTitle;