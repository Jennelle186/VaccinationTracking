import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectVaccinator = ({ value, onChange, names }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="vaccinator-name">Vaccinator Name</InputLabel>
        <Select value={value} onChange={onChange} fullWidth>
          {names &&
            names.map((user) => (
              <MenuItem
                key={user.firstName + " " + user.lastName}
                value={user.firstName + " " + user.lastName}
                // defaultValue={}
              >
                {user.firstName + " " + user.lastName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectVaccinator;
