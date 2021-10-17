import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
} from "@material-ui/core";

const Category = ({ value, onChange }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="vaccinator-name">Category</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          fullWidth
          defaultValue=""
          id="grouped-select"
          label="Grouping"
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="ROAP">ROAP</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;
