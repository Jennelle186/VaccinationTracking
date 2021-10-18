import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  snackBar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
}));

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
  const [address, setAddress] = useState(currentUser.address);
  const [selectedDate, handleDateChange] = useState(currentUser.birthdate);
  const [phoneNumber, setphoneNumber] = useState(currentUser.phoneNumber);

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

  const handleValue = (value) => {
    setphoneNumber(value);
  };

  const birthdate = new Date(selectedDate).toDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("users").doc(uid);
      const ref = userRef.set(
        {
          firstName,
          middleName,
          lastName,
          address,
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
            <Grid item xs>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Middle Name (Optional)"
                variant="outlined"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs>
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
            <Grid item xs={12}>
              <ReactPhoneInput
                value={phoneNumber}
                defaultCountry="us"
                onlyCountries={["ph"]}
                onChange={handleValue}
                placeholder="Phone Number"
                inputStyle={{
                  width: "100%",
                }}
              />
            </Grid>

            <br />
            <Grid item xs>
              <ButtonForm type="submit" fullWidth onClick={() => handleClick()}>
                Submit
              </ButtonForm>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.snackBar}
      >
        <Alert onClose={handleClose} severity="success">
          Profile Updated!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Profile;
