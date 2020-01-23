import React, { useEffect } from "react";

import RoutesContext from "../../RoutesContext";

const DocumentTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  })

  return null
}

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
