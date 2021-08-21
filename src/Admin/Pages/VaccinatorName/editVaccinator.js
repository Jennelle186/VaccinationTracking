import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { Card, TextField, CardHeader, Grid } from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";
import ButtonForm from "../../../components/Forms/Button/button";

const EditVaccinator = () => {
  const location = useLocation();
  const rowData = location.state;
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccinator-name")
      .doc(rowData)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setUsers(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const goToPrevPath = () => {
    history.goBack();
  };

  return (
    <div>
      <Card
        style={{
          padding: "1rem",
          maxWidth: 500,
          margin: "0 auto",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <Grid item>
          <ButtonForm onClick={() => goToPrevPath()}>Back</ButtonForm>
        </Grid>
        {users &&
          users.map((user) => (
            <li style={{ listStyle: "none" }}>
              <CardHeader title="Update Profile" />
              <TextField
                type="text"
                value={firstName}
                variant="outlined"
                label="First Name"
                fullWidth
              />
            </li>
          ))}
      </Card>
    </div>
  );
};

export default EditVaccinator;
