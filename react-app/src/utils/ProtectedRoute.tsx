import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { UserRoleEnum } from "../store/auth/types";
import { RootState } from "../store/rootReducer";

const ProtectedRoute = ({
  component: Component,
  path,
  role,
}: RouteProps & { role: UserRoleEnum }) => {
  const auth = useSelector((state: RootState) => state.authReducer);

  if (!auth.isAuth) {
    return <Redirect to="/login" />;
  }

  if (role && auth.user?.role !== role) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export { ProtectedRoute };
