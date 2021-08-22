import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectVaccinator = ({ value, onChange }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccinator-name")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setNames(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);
  //   console.log(value);
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
