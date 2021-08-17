//header https://www.youtube.com/playlist?list=PLakAmVjYWIY6m-EfiY6swKgDjtnQgFS5A

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import DrawerComponent from "./DrawerComponent/drawer";
import ButtonForm from "../Forms/Button/button";
import { signOutUserStart } from "../../Redux/User/userActions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Header = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for the tab to stay on the correct path/page even if it was reloaded
  useEffect(() => {
    let path = window.location.pathname;
    if (path === "/" && value !== 0) setValue(0);
    else if (path === "/login" && value !== 1) setValue(1);
    // else if (path === "/about" && value !== 2) setValue(2);
  }, [value]);

  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  useEffect(() => {
    //whenever signinsuccess is true
    if (currentUser) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <div>
      <AppBar
        style={{
          position: "sticky",
          top: "0",
        }}
      >
        {/*  */}
        <Toolbar
          variant="dense"
          style={{
            backgroundColor: "#2196F3",
          }}
        >
          {/*------------------- Name of the website -----------------*/}
          {isMatch ? (
            <></>
          ) : (
            <Typography variant="h6" color="inherit">
              Website
              {/* //or just change this typography to an icon or picture */}
            </Typography>
          )}
          {/*------------------- Name of the website -----------------*/}

          {/* DrawerComponent is for the mobile view for the navbar. Tabs is for the desktop or large
          screen view */}
          {isMatch ? (
            <h1>
              <div>
                <DrawerComponent />
              </div>
            </h1>
          ) : (
            <div>
              <Grid>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ flexGrow: 1 }}
                >
                  {currentUser && [
                    <>
                      <Tab
                        disableRipple
                        label="Homepage"
                        to="/"
                        component={Link}
                        style={{ flexGrow: 1 }}
                      />
                      <Tab
                        disableRipple
                        label="Profile"
                        to="/profile"
                        component={Link}
                      />
                      <Tab disableRipple label="Settings" to="/profile" />
                      <Button color="inherit" onClick={() => signOut()}>
                        Logout
                      </Button>
                    </>,
                  ]}
                  {!currentUser && [
                    <>
                      <Tab
                        disableRipple
                        label="Homepage"
                        to="/"
                        component={Link}
                      />
                      <Tab
                        disableRipple
                        label="Login"
                        to="/login"
                        component={Link}
                      />
                    </>,
                  ]}
                </Tabs>
              </Grid>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
