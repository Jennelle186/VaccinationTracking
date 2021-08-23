import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectVaccine = ({ value, onChange, vaccines }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="vaccinator-name">Vaccine Type</InputLabel>
        <Select value={value} onChange={onChange} fullWidth>
          {vaccines &&
            vaccines.map((index) => (
              <MenuItem
                key={index.vaccine}
                value={index.vaccine}
                // defaultValue={}
              >
                {index.vaccine}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectVaccine;
