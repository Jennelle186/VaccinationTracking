import React, { useState } from "react";
import { CardContent, Grid, TextField } from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import ReactPhoneInput from "react-phone-input-2";

import { firestore } from "../../../Firebase/utils";

const AddVacinator = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handleValue = (value) => {
    setphoneNumber(value);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setphoneNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("vaccinator-name").doc();
      const ref = userRef.set({
        firstName,
        lastName,
        phoneNumber,
      });
      resetForm();
      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
              required
            />
          </Grid>
          <br />
          <Grid>
            <ButtonForm type="submit" fullWidth>
              Submit
            </ButtonForm>
          </Grid>
          <br />
        </Grid>
      </form>
    </CardContent>
  );
};

export default AddVacinator;
