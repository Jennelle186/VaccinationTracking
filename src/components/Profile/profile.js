import React, { useState } from "react";
import {
  Grid,
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "react-phone-input-2/lib/style.css";
import ReactPhoneInput from "react-phone-input-2";
import ButtonForm from "./../Forms/Button/button";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
  },
});

const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const current = new Date().toISOString().split("T")[0];

  //variables
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [phoneNumber, setphoneNumber] = useState();

  const handleValue = (value) => {
    setphoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        "Full Name: ",
        firstName + middleName + lastName,
        ",",
        selectedDate.toLocaleDateString(),
        ",",
        phoneNumber
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes.root}>
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
              {/* https://stackoverflow.com/questions/59809814/unable-to-increase-sizeheight-width-of-react-phone-input-2 */}
              <ReactPhoneInput
                defaultCountry="us"
                onlyCountries={["ph"]}
                onChange={handleValue}
                placeholder="Phone Number"
              />
            </Grid>
            <br />
            <Grid>
              <ButtonForm type="submit" fullWidth>
                Submit
              </ButtonForm>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;
