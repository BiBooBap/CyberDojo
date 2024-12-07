import React from "react";
import { Route, redirect } from "react-router-dom";
import { isUserLoggedIn } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isUserLoggedIn() ? <Component {...props} /> : <redirect to="/login" />
    }
  />
);

export default PrivateRoute;
