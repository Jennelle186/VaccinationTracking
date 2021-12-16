import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/utils";

import {
  TextField,
  Card,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import ButtonForm from "../Forms/Button/button";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    marginBottom: "1rem",
    padding: "1rem",
  },
  li: {
    listStyle: "none",
    textAlign: "left",
  },
});

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Complaints = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [uid, setUid] = useState(currentUser.id);
  const [complaints, setComplaints] = useState("");

  //for Mui alert---
  const [open, setOpen] = useState(false); //for MUI ALERT

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //--------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userRef = firestore.collection("users").doc(uid);
      const ref = userRef.set(
        {
          complaints,
        },
        { merge: true }
      );
      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card elevation={5} className={classes.root}>
        <Typography variant="subtitle1">
          For any complaints or concerns, you may contact us through the phone
          number listed at the footer or submit it here and we'll get back at
          you through phonecall.
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            id="complaints"
            label="Enter your complaints or concerns"
            variant="outlined"
            fullWidth
            multiline
            rowsMax={Infinity}
            value={complaints}
            onChange={(e) => setComplaints(e.target.value)}
          />
          <ButtonForm
            type="submit"
            style={{ marginTop: "1rem" }}
            onClick={() => handleClick()}
          >
            Submit
          </ButtonForm>
        </form>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.snackBar}
      >
        <Alert onClose={handleClose} severity="success">
          Complaint or Concern has been submitted! We'll get back to you through
          phone call
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Complaints;
