import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import "./App.css";
//firebase
import { auth, handleUserProfile } from "./Firebase/utils";

import WithAuth from "./Higher Order Component/withAuth";
import WithAdmin from "./Admin/AdminRoute/withAdmin";

//pages
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/Login/login";
import Registration from "./pages/Registration/registration";
import QrCodePage from "./pages/Generate QR Code/qrCodePage";
import { Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "./components/MainLayout/mainLayout";
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import AppBar from "./Admin/Components/AppBar/appBar";
import ForgotPassword from "./components/ForgotPassword/forgotPass";
import ProfilePage from "./pages/Profile/profile";
import Users from "./Admin/Pages/Users/Users";
import Settings from "./components/Settings/settings";

import { setCurrentUser, setAuthPending } from "./redux/user/user.actions";
import { checkUserAdmin } from "./Admin/AdminRoute/checkAdmin";

import { AuthRoute } from "./Hooks/AuthRoute";
import { AdminRoute } from "./Hooks/AdminRoute";

import MobileLogin from "./components/Login/MobileLogin";

const App = (props) => {
  const {
    setAuthPending, // <-- access action
    setCurrentUser,
    currentUser,
  } = props;

  const admin = checkUserAdmin(currentUser);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      setAuthPending(true); //--make it true
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }

      // setCurrentUser(userAuth); //clears auth pending
      // setAuthPending(userAuth); //does work but after loggin out, you must refresh the page to properly log out
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <br />
                <LoginPage />
              </MainLayout>
            )
          }
        />

        <Route
          exact
          path="/loginMobile"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <br />
                <MobileLogin />{" "}
              </MainLayout>
            )
          }
        />

        <Route
          exact
          path="/registration"
          render={() => (
            <MainLayout>
              <br />
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/resetPassword"
          render={() => (
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          )}
        />
        <AuthRoute
          exact
          path="/profile"
          render={() => (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          )}
        />
        <AuthRoute
          exact
          path="/settings"
          render={() => (
            <MainLayout>
              <Settings />
            </MainLayout>
          )}
        />
        <AuthRoute
          exact
          path="/QR-Code"
          render={() => (
            <MainLayout>
              <QrCodePage />
            </MainLayout>
          )}
        />

        <AdminRoute component={AppBar} />
        <AdminRoute exact path="/admin" component={AdminHome} />
        <AdminRoute exact path="/users" component={Users} />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthPending: (pending) => dispatch(setAuthPending(pending)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
