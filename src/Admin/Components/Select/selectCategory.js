import React from "react";
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from "@material-ui/core";

const Category = ({ value, onChange }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="vaccinator-name">Category</InputLabel>
        <Select value={value} onChange={onChange} fullWidth defaultValue="" id="grouped-select" label="Grouping">
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem>
            <MenuItem value="A5">A5</MenuItem>
            <MenuItem value="ROAP">ROAP</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;
