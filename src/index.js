import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Menu, Navbar, AppDocumentTitle, AppRoutes } from "./components";
import { routeType } from "./utils";
import RoutesContext, { RoutesProvider } from "./RoutesContext";

const styles = theme => ({
  appContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "200px"
    }
  }
});

class MuiShell extends React.Component {
  state = {
    menuToggled: false
  };

  openMenu = () => {
    this.setState({
      menuToggled: true
    });
  };

  closeMenu = () => {
    this.setState({
      menuToggled: false
    });
  };

  render() {
    const {
      classes,
      routes,
      hideMenu,
      menuLogoSrc,
      leftAppBarComponent,
      rightAppBarComponent,
      appTitle,
      documentTitleFormatter,
      menuLabelFormatter,
      linkFormatter,
      breadcrumbFormatter,
      drawerFooter,
      rightBreadcrumbRender
    } = this.props;
    const { menuToggled } = this.state;

    const appContentStyle = hideMenu
      ? {
          marginLeft: "initial"
        }
      : undefined;

    return (
      <RoutesProvider routes={routes}>
        {!hideMenu && (
          <Menu
            toggled={menuToggled}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            menuLogoSrc={menuLogoSrc}
            linkFormatter={linkFormatter}
            menuLabelFormatter={menuLabelFormatter}
            drawerFooter={drawerFooter}
          />
        )}
        <AppDocumentTitle
          appTitle={appTitle}
          documentTitleFormatter={documentTitleFormatter}
        />
        <div className={classes.appContent} style={appContentStyle}>
          <Navbar
            hideMenu={hideMenu}
            openMenu={this.openMenu}
            appTitle={appTitle}
            leftAppBarComponent={leftAppBarComponent}
            rightAppBarComponent={rightAppBarComponent}
            breadcrumbFormatter={breadcrumbFormatter}
            rightBreadcrumbRender={rightBreadcrumbRender}
          />
          <AppRoutes />
        </div>
      </RoutesProvider>
    );
  }
}

MuiShell.propTypes = {
  routes: routeType.isRequired,
  hideMenu: PropTypes.bool,
  menuLogoSrc: PropTypes.string,
  leftAppBarComponent: PropTypes.node,
  rightAppBarComponent: PropTypes.node,
  drawerFooter: PropTypes.node,
  appTitle: PropTypes.string,
  linkFormatter: PropTypes.any,
  documentTitleFormatter: PropTypes.any,
  menuLabelFormatter: PropTypes.any,
  breadcrumbFormatter: PropTypes.any,
  rightBreadcrumbRender: PropTypes.func
};

export { RoutesContext };

export default withStyles(styles)(MuiShell);
