import React, { useState } from "react";
import {
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  InputProps,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import ReactPhoneInput from "react-phone-input-2";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
  },
});

const AddVacinator = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handleValue = (value) => {
    setphoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(firstName, lastName, phoneNumber);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className={classes.root}>
      <CardHeader title="Add Vacinator Name" />
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
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
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
            <br />
            <Grid>
              <Button fullWidth variant="outlined" color="secondary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddVacinator;