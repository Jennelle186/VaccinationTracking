import React from "react";
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
}));

const MobileView = () => {
  const classes = useStyles();
  return (
    <BottomBar>
      <IconButton edge="start" color="inherit" aria-label="open drawer">
        <HomeRoundedIcon /> Home
      </IconButton>
      {/*
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <AssignmentIcon />
            VaccSymptom
          </IconButton> */}

      <Fab color="primary" aria-label="add" className={classes.fabButton}>
        <CropFreeRoundedIcon />
        QR
      </Fab>

      <div className={classes.grow} />

      {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <SupervisorAccountIcon />
            VaccPopulation
          </IconButton> */}

      <IconButton edge="end" color="inherit">
        <SettingsRoundedIcon />
        Settings
      </IconButton>
    </BottomBar>
  );
};

export default MobileView;
