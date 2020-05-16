import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
