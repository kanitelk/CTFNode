import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { UserRole } from "../types";
import { useStore } from "effector-react";
import { sessionUser$ } from "../models/auth";

const ProtectedRoute = ({
  component: Component,
  path,
  role,
}: RouteProps & { role: UserRole }) => {
  const session = useStore(sessionUser$);

  if (!session) {
    return <Redirect to="/login" />;
  }

  if (role && session.role === UserRole.USER && role === UserRole.ADMIN) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export { ProtectedRoute };
