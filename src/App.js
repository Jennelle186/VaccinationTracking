import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/Login/login";
import Registration from "./pages/Registration/registration";
import { Route, Switch } from "react-router-dom";
import MainLayout from "./components/MainLayout/mainLayout";
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import AppBar from "./Admin/Components/AppBar/appBar";

import { useDispatch } from "react-redux";
import { userAuthSession } from "./Redux/User/userActions";

import WithAuth from "./HOC/withAuth";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthSession());

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Route render={() => <AppBar />} />
        <Route exact path="/admin" render={() => <AdminHome />} />
      </Switch>
    </div>
  );
};

export default App;
