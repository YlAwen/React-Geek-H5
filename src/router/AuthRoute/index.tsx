import React from "react";
import { hasToken } from "utils/storage";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};
export default function AuthRoute({ children }: Props) {
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
