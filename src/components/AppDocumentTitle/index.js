import React from "react";
import DocumentTitle from "react-document-title";

import RoutesContext from "../../RoutesContext";

const AppDocumentTitle = ({ documentTitleFormatter, appTitle }) => (
  <RoutesContext.Consumer>
    {({ currentRoute }) =>
      currentRoute && (
        <DocumentTitle
          title={
            documentTitleFormatter
              ? documentTitleFormatter(currentRoute)
              : `${currentRoute.label} - ${appTitle}`
          }
        />
      )
    }
  </RoutesContext.Consumer>
);

export default AppDocumentTitle;
