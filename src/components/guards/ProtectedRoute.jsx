import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Protects routes that require authentication.
 * Redirects unauthenticated users to /login.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Support both usage patterns:
  // 1. As a Route element with nested routes: <Route element={<ProtectedRoute />}><Route ... /></Route>
  //    In that case we should render an <Outlet /> so nested routes render.
  // 2. As a wrapper component: <ProtectedRoute><SomePage/></ProtectedRoute>
  //    In that case children will be provided and should be returned.
  if (children) return children;

  return <Outlet />;
}
