import React, { useState, useEffect } from "react";
import { CardContent, Grid, TextField } from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import { firestore } from "../../../Firebase/utils";
const AddVaccine = () => {
  const [vaccine, setVaccine] = useState("");
  const [dose, setDose] = useState("");
  const [daysApart, setDaysApart] = useState(0);
  const [stocks, setStocks] = useState(0);
  const availability = true;

  const resetForm = () => {
    setVaccine("");
    setDose("");
    setDaysApart("");
    setStocks(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("vaccines").doc();
      const ref = userRef.set({
        vaccine,
        dose,
        daysApart,
        availability,
        stocks: Number(stocks),
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
              label="Vaccine Name"
              variant="outlined"
              fullWidth
              required
              value={vaccine}
              onChange={(e) => setVaccine(e.target.value)}
            />
          </Grid>
          <Grid item>
            <input
              type="radio"
              value="1"
              name="dosage"
              onChange={(e) => setDose(e.target.value)}
            />
            1 Dose
            <br></br>
            <input
              type="radio"
              value="2"
              name="dosage"
              onChange={(e) => setDose(e.target.value)}
            />{" "}
            2 Doses
          </Grid>
          <Grid item>
            {dose == "2" && (
              <TextField
                type="number"
                label="How many days apart"
                fullWidth
                required
                value={daysApart}
                onChange={(e) => setDaysApart(e.target.value)}
              />
            )}
          </Grid>
          <Grid item>
            <TextField
              type="number"
              label="Stocks"
              fullWidth
              required
              value={stocks}
              onChange={(e) => setStocks(e.target.value)}
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

export default AddVaccine;
