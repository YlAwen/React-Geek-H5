import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthRoute from "router/AuthRoute";
import DefaultShow from "components/DefaultShow";
const Layout = React.lazy(() => import("pages/Layout"));
const Login = React.lazy(() => import("pages/Login"));
const ProfileEdit = React.lazy(() => import("pages/Profile/Edit"));
const Chat = React.lazy(() => import("pages/Profile/Chat"));
const Home = React.lazy(() => import("pages/Home"));
const Profile = React.lazy(() => import("pages/Profile"));
const Question = React.lazy(() => import("pages/Question"));
const Video = React.lazy(() => import("pages/Video"));
const rootShow = <div>loading...</div>;
const layoutShow = (
  <>
    <DefaultShow />
    <DefaultShow />
    <DefaultShow />
  </>
);
export function RootRouter() {
  return (
    <Router>
      <Suspense fallback={rootShow}>
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={<Layout />}></Route>
          {/* 登录才能访问 */}
          <Route
            path="/home/profile/edit"
            element={
              <AuthRoute>
                <ProfileEdit />
              </AuthRoute>
            }
          />
          <Route
            path="/home/profile/chat"
            element={
              <AuthRoute>
                <Chat />
              </AuthRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
export function LayoutRouter() {
  return (
    <Suspense fallback={layoutShow}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </Suspense>
  );
}
