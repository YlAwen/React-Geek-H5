import React from "react";
import { hasToken } from "utils/storage";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const location = useLocation();
  return hasToken() ? (
    children
  ) : (
    <Navigate
      state={{
        from: location,
      }}
      to="/login"
      replace
    />
  );
}
