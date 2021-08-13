//those textfields are not yet final
import React, { useState } from "react";
import {
  Grid,
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
  },
});

const Scan = () => {
  const classes = useStyles();
  const [firstDose, setFirstDose] = useState(new Date().toLocaleDateString());
  const [selectedDate, handleDateChange] = useState(new Date());

  //for the estimated 2nd Dose of vaccine logic--------------------------
  const date = new Date();
  var newdate = new Date(date);

  newdate.setDate(newdate.getDate() + 28);
  console.log(newdate);

  var dd = newdate.getDate();
  var mm = newdate.getMonth() + 1;
  var y = newdate.getFullYear();

  const secondDose = mm + "/" + dd + "/" + y;
  const [secDose, setSecDose] = useState(secondDose); //variable for 2nd dose
  //for the estimated 2nd Dose of vaccine logic--------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Update Vaccination Status" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField
                label="First Name"
                variant="outlined"
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Middle Name (Optional)"
                variant="outlined"
                // value={middleName}
                // onChange={(e) => setMiddleName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                variant="outlined"
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
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
            <Grid item>
              <TextField
                type="text"
                label="Address"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              {/* Might have to use select for the type of vaccine */}
            </Grid>
            <Grid item>
              <TextField
                type="text"
                label="Control Number of the Vaccine "
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                type="text"
                label="1st Dosage"
                variant="outlined"
                value={firstDose}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                label="1st Dosage Vaccinator Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            {/* <Grid item>
              <TextField
                type="text"
                label="Estimated 2nd Dosage"
                variant="outlined"
                value={secondDose}
                fullWidth
              />
            </Grid> */}
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="MM/dd/yyyy"
                  value={secDose}
                  onChange={setSecDose}
                  fullWidth
                  id="date-picker-inline"
                  label="Estimated 2nd Dose of Vaccination"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <TextField
                type="text"
                label="2nd Dosage Vaccinator Name"
                variant="outlined"
                fullWidth
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

export default Scan;