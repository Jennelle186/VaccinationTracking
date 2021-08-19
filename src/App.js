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
import { Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "./components/MainLayout/mainLayout";
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import AppBar from "./Admin/Components/AppBar/appBar";
import ForgotPassword from "./components/ForgotPassword/forgotPass";
import ProfilePage from "./pages/Profile/profile";
import Users from "./Admin/Pages/Users/Users";

import { setCurrentUser, setAuthPending } from "./redux/user/user.actions";
import { checkUserAdmin } from "./Admin/AdminRoute/checkAdmin";

import { AuthRoute } from "./Hooks/AuthRoute";
import { AdminRoute } from "./Hooks/AdminRoute";
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
        <AuthRoute
          exact
          path="/profile"
          render={() => (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          )}
        />

        <AdminRoute component={AppBar} />
        <AdminRoute exact path="/admin" component={AdminHome} />
        <AdminRoute exact path="/users" component={Users} />

        {/* <Route
          exact
          path="/profile"
          render={() => (
            <WithAuth>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </WithAuth>
          )}
        /> */}

        {/* <Route
          render={() => (
            <WithAdmin>
              {" "}
              <AppBar />
            </WithAdmin>
          )}
        /> */}

        {/* <Route
          exact
          path="/admin"
          render={() => (
            <WithAdmin>
              <AdminHome />
            </WithAdmin>
          )}
        /> */}
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
