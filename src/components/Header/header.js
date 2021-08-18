//header https://www.youtube.com/playlist?list=PLakAmVjYWIY6m-EfiY6swKgDjtnQgFS5A

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  makeStyles,
} from "@material-ui/core";
import DrawerComponent from "./DrawerComponent/drawer";

import { auth } from "../../Firebase/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { currentUser } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for the tab to stay on the correct path/page even if it was reloaded
  useEffect(() => {
    let path = window.location.pathname;
    if (path === "/" && value !== 0) setValue(0);
    else if (path === "/login" && value !== 1) setValue(1);
    else if (path === "/registration" && value !== 2) setValue(2);
    else if (path === "/profile" && value !== 2) setValue(2);
  }, [value]);

  console.log(currentUser);

  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
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
                >
                  <Tab disableRipple label="Homepage" to="/" component={Link} />
                  {currentUser && (
                    <>
                      <Tab
                        disableRipple
                        label="Profile"
                        to="/profile"
                        component={Link}
                      />
                      <Button color="inherit" onClick={() => auth.signOut()}>
                        Logout
                      </Button>
                    </>
                  )}

                  {!currentUser && (
                    <>
                      <Tab
                        disableRipple
                        label="Login"
                        to="/login"
                        component={Link}
                      />
                      <Tab
                        disableRipple
                        label="Register"
                        to="/registration"
                        component={Link}
                      />
                    </>
                  )}
                </Tabs>
              </Grid>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
