import React, { useEffect, useState } from "react";
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
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { DialogBtn } from "../Forms/DialogButton/dialogBtn";

import { auth } from "../../Firebase/utils";
import { checkUserAdmin } from "../../Admin/AdminRoute/checkAdmin";

import MobileView from "./BottomBar/mobileView";
import DrawerComponent from "./DrawerComponent/drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "whitesmoke",
    color: "black",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    align: "right",
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    header: {
      position: "fixed",
    },
    toolbar: {
      backgroundColor: "red",
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
    else if (path === "/registration" && value !== 2) setValue(2);
  }, [value]);

  const admin = checkUserAdmin(currentUser);

  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //---------------------------------------------------------

  //Dialog or modal for loggin out
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //-------------------------------

  //for the menu of profile and logout
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" className={classes.link}>
        <MenuItem>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleClickOpen}>Log Out</MenuItem>
    </Menu>
  );
  //---------------------------------------------------

  return (
    <div>
      {isMatch ? (
        <DrawerComponent />
      ) : (
        <AppBar className={classes.root}>
          <div style={{ width: "100%" }}>
            <Toolbar variant="dense" className={classes.toolbar}>
              <Typography>Ayala Vaccination Tracker</Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Tabs
                    centered
                    value={value}
                    fullWidth={true}
                    indicatorColor="primary"
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="fullWidth"
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
                    {admin && (
                      <Tab
                        disableRipple
                        label="Admin"
                        to="/admin"
                        component={Link}
                      />
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
                </Grid>
                {currentUser && (
                  <Grid item alignItems="flex-end" style={{ float: "right" }}>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Toolbar>
          </div>
        </AppBar>
      )}
      {renderMenu}
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
              handleMenuClose();
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
