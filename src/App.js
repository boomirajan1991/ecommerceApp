import React, { Suspense, lazy } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HeaderLayout from "./pages/HeaderLayout";
import { isJwtExpired } from "jwt-check-expiration";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dasdboard = lazy(() => import("./pages/Dasdboard"));
const Learn = lazy(() => import("./pages/Learn"));
const PagenotFound = lazy(() => import("./pages/PagenotFound"));
const Product = lazy(() => import("./components/Product/Product"));
const Category = lazy(() => import("./components/Category/Category"));
const Brand = lazy(() => import("./components/Brand"));
const Settings = lazy(() => import("./components/Settings"));
const Profile = lazy(() => import("./components/Profile"));
const Coupon = lazy(() => import("./components/Coupon/Coupon"));
function App() {
  return (
    <div className="app">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route
                path="dashboard"
                element={
                  <RequireAuth redirectTo="/login">
                    <Dasdboard />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="product"
                element={
                  <RequireAuth redirectTo="/login">
                    <Product />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="category"
                element={
                  <RequireAuth redirectTo="/login">
                    <Category />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="brand"
                element={
                  <RequireAuth redirectTo="/login">
                    <Brand />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="settings"
                element={
                  <RequireAuth redirectTo="/login">
                    <Settings />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="learn"
                element={
                  <RequireAuth redirectTo="/login">
                    <Learn />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <RequireAuth redirectTo="/login">
                    <Profile />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="coupon"
                element={
                  <RequireAuth redirectTo="/login">
                    <Coupon />
                  </RequireAuth> 
                }
              ></Route>
              <Route
                path="*"
                element={
                  <RequireAuth redirectTo="/login">
                    <PagenotFound />
                  </RequireAuth>
                }
              ></Route>
            </Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Routes>
        </Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

const RequireAuth = ({ children, redirectTo }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = (token !== null && token !== undefined && token !== "") ? isJwtExpired(token) : true;
  return !isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default App;
