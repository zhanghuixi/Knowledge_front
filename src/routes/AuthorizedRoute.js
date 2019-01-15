import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { getAuthenticationToken } from "../utils/authentication";
import { withRouter } from "react-router-dom";
//import RootStore from "../models/RootStore";

const AuthorizedRoute = observer(({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return getAuthenticationToken() !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: rest.location }
            }}
          />
        );
      }}
    />
  );
});
export default withRouter(AuthorizedRoute);
