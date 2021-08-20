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
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  Box,
} from "@material-ui/core";
import DrawerComponent from "./DrawerComponent/drawer";
import { DialogBtn } from "../Forms/DialogButton/dialogBtn";

import { auth } from "../../Firebase/utils";
import { checkUserAdmin } from "../../Admin/AdminRoute/checkAdmin";

import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import MobileView from "./BottomBar/mobileView";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    align: "right",
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { currentUser } = props;
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for the tab to stay on the correct path/page even if it was reloaded
  useEffect(() => {
    let path = window.location.pathname;
    if (path === "/" && value !== 0) setValue(0);
    else if (path === "/login" && value !== 1) setValue(1);
    else if (path === "/QR-Code" && value !== 1) setValue(1);
    else if (path === "/profile" && value !== 2) setValue(2);
    else if (path === "/registration" && value !== 2) setValue(2);
  }, [value]);

  const admin = checkUserAdmin(currentUser);

  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {isMatch ? (
        <MobileView />
      ) : (
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
            <Typography>Ayala Vaccination Tracker</Typography>
            <div>
              <>
                <Tabs
                  centered
                  value={value}
                  fullWidth={true}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ display: "inline-block" }}
                >
                  {currentUser && (
                    <Tab
                      disableRipple
                      label="Homepage"
                      to="/"
                      component={Link}
                    />
                  )}
                  {currentUser && (
                    <Tab
                      disableRipple
                      label="QR Code"
                      to="/QR-Code"
                      component={Link}
                    />
                  )}
                  {currentUser && (
                    <Tab
                      disableRipple
                      label="Profile"
                      to="/profile"
                      component={Link}
                    />
                  )}
                  {admin && (
                    <Tab
                      disableRipple
                      label="Admin"
                      to="/admin"
                      component={Link}
                    />
                  )}
                  {currentUser && (
                    <Button color="inherit" onClick={handleClickOpen}>
                      Logout
                    </Button>
                  )}

                  {!currentUser && (
                    <Tab
                      disableRipple
                      label="Homepage"
                      to="/"
                      component={Link}
                    />
                  )}
                  {!currentUser && (
                    <Tab
                      disableRipple
                      label="Login"
                      to="/login"
                      component={Link}
                    />
                  )}
                </Tabs>
              </>
            </div>
          </Toolbar>
        </AppBar>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogBtn handleClose={handleClose}>
          <Button
            onClick={() => {
              auth.signOut();
              handleClose();
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogBtn>
      </Dialog>
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
