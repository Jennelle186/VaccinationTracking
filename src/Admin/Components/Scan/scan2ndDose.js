import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import SelectVaccinator from "../SelectVaccinator/selectVaccinator";

const Scan2ndDose = ({ names }) => {
  return (
    <div>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="MM/dd/yyyy"
            // value={secDose}
            // onChange={setSecDose}
            fullWidth
            id="date-picker-inline"
            label="Estimated 2nd Dose of Vaccination"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <SelectVaccinator
          //   value={secondVaccinator}
          //   onChange={handleChange2}
          names={names}
        />
      </Grid>
    </div>
  );
};

export default Scan2ndDose;
