import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
//firebase
import { auth, handleUserProfile } from "./Firebase/utils";

import WithAuth from "./Higher Order Component/withAuth";
import WithAdmin from "./Admin/AdminRoute/withAdmin";

//pages
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/Login/login";
import Registration from "./pages/Registration/registration";
import { Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "./components/MainLayout/mainLayout";
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import AppBar from "./Admin/Components/AppBar/appBar";
import ForgotPassword from "./components/ForgotPassword/forgotPass";
import ProfilePage from "./pages/Profile/profile";

import { setCurrentUser } from "./redux/user/user.actions";

import { checkUserAdmin } from "./Admin/AdminRoute/checkAdmin";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;
  const admin = checkUserAdmin(currentUser);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
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
          render={() => (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/registration"
          render={() => (
            <MainLayout>
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

        <Route
          exact
          path="/profile"
          render={() => (
            <WithAuth>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          render={() => (
            <WithAdmin>
              {" "}
              <AppBar />
            </WithAdmin>
          )}
        />

        <Route
          exact
          path="/admin"
          render={() => (
            <WithAdmin>
              <AdminHome />
            </WithAdmin>
          )}
        />
        {/* {admin ? (
          <li>
            <Route render={() => <AppBar />} />
            <Route exact path="/admin" render={() => <AdminHome />} />
          </li>
        ) : (
          <Redirect to="/login" />
        )} */}
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
