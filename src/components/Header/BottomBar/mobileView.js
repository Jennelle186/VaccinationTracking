import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Fab, makeStyles } from "@material-ui/core";

//icons
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded"; //QR code ng citizen
import HomeRoundedIcon from "@material-ui/icons/HomeRounded"; //home
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"; //setting?

import BottomBar from "./BottomBar";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -10,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const MobileView = (props) => {
  const { currentUser } = props;
  const classes = useStyles();
  return (
    <BottomBar>
      <Link to="/" className={classes.link}>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <HomeRoundedIcon /> Home
        </IconButton>
      </Link>

      {currentUser ? (
        <Link to="/login">
          <Fab color="primary" aria-label="add" className={classes.fabButton}>
            <CropFreeRoundedIcon />
            QR
          </Fab>
        </Link>
      ) : (
        <Link to="/QR-Code">
          <Fab color="primary" aria-label="add" className={classes.fabButton}>
            <CropFreeRoundedIcon />
            QR
          </Fab>
        </Link>
      )}

      <div className={classes.grow} />
      <Link to="/settings" className={classes.link}>
        <IconButton edge="end" color="inherit">
          <SettingsRoundedIcon />
          Settings
        </IconButton>
      </Link>
    </BottomBar>
  );
};

export default MobileView;
