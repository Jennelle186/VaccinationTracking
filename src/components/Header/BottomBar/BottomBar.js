import React from "react";
import { makeStyles, Toolbar, AppBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -10,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  fabButton2: {
    position: "absolute",
    zIndex: 1,
    left: "auto",
    right: 10,
    margin: "0 auto",
    top: 10,
    bottom: "auto",
  },
}));

const BottomBar = ({ children, ...otherProps }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.appBar}
      style={{ background: "#2196F3" }}
    >
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};

export default BottomBar;
