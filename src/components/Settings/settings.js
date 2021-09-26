import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import { auth } from "../../Firebase/utils";
import { DialogBtn } from "../Forms/DialogButton/dialogBtn";

import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Settings = () => {
  const { currentUser } = useSelector(mapState);
  const [open, setOpen] = React.useState(false);

  //Dialog or modal for loggin out
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //-------------------------------
  const btn = {
    margin: "1.5rem 0",
    backgroundColor: " rgb(33, 150, 243)",
    width: "100%",
    color: "white",
    borderRadius: "12px",
    padding: "1rem",
  };

  const link = {
    textDecoration: "none",
  };

  const name = [
    currentUser?.firstName,
    currentUser?.middleName,
    currentUser?.lastName,
  ]
    .filter((part) => Boolean(part))
    .join(" ");

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", padding: "1rem", marginBottom: "5rem" }}
    >
      <Grid align="center">
        {(currentUser?.firstName && currentUser?.lastName) ||
        currentUser?.middleName ? (
          <Typography>Hello, {name}</Typography>
        ) : (
          <Typography>
            Please click the button below to update your profile
          </Typography>
        )}
      </Grid>
      <form>
        <Link to="/profile" style={link}>
          <Button style={btn} color="primary">
            Your Profile
          </Button>
        </Link>

        <Button style={btn}>Summary Reports</Button>
        <Button style={btn}>Vaccine Aftercare</Button>
        <Button style={btn} onClick={handleClickOpen}>
          Log Out
        </Button>
      </form>
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
    </Grid>
  );
};

export default Settings;
