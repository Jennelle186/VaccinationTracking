import React from "react";
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from "@material-ui/core";

const Category = ({ value, onChange }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="vaccinator-name">Category</InputLabel>
        <Select value={value} onChange={onChange} fullWidth defaultValue="" id="grouped-select" label="Grouping">
        <ListSubheader>Priority Eligible A</ListSubheader>
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem>
            <MenuItem value="A5">A5</MenuItem>
        <ListSubheader>Priority Eligible B</ListSubheader>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="B3">B3</MenuItem>
            <MenuItem value="B4">B4</MenuItem>
            <MenuItem value="B5">B5</MenuItem>
            <MenuItem value="B6">B6</MenuItem>
        <ListSubheader>Priority Eligible C</ListSubheader>
            <MenuItem value="B6">C</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;
