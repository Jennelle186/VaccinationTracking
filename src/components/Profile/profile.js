import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "react-phone-input-2/lib/style.css";
import ReactPhoneInput from "react-phone-input-2";
import ButtonForm from "./../Forms/Button/button";
import { firestore } from "../../Firebase/utils";

import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
});

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [value, setValue] = useState();
  const current = new Date().toISOString().split("T")[0];

  //variables
  const [uid, setUid] = useState(currentUser.id);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [middleName, setMiddleName] = useState(currentUser.middleName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [selectedDate, handleDateChange] = useState(currentUser.birthdate);
  const [phoneNumber, setphoneNumber] = useState(currentUser.phoneNumber);

  //for Mui alert---
  const [open, setOpen] = React.useState(false); //for MUI ALERT

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

  const handleValue = (value) => {
    setphoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const birthdate = selectedDate.toDateString();
    try {
      const userRef = firestore.collection("users").doc(uid);
      const ref = userRef.set(
        {
          firstName,
          middleName,
          lastName,
          birthdate,
          phoneNumber,
        },
        { merge: true }
      );
      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader title="Update Profile" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Middle Name (Optional)"
                variant="outlined"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                  id="date-picker-inline"
                  label="BirthDate"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid>
              <ReactPhoneInput
                value={phoneNumber}
                defaultCountry="us"
                onlyCountries={["ph"]}
                onChange={handleValue}
                placeholder="Phone Number"
              />
            </Grid>
            <br />
            <Grid>
              <ButtonForm type="submit" fullWidth onClick={() => handleClick()}>
                Submit
              </ButtonForm>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Profile Updated!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Profile;
