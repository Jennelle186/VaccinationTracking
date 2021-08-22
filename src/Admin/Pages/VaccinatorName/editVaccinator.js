import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, TextField, CardHeader, Grid, Snackbar } from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";
import ButtonForm from "../../../components/Forms/Button/button";
import MuiAlert from "@material-ui/lab/Alert";

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditVaccinator = () => {
  const location = useLocation();
  const rowData = location.state;
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const goToPrevPath = () => {
    history.goBack();
  };

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
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const changeHandler = (index) => (e) => {
    const { name, value } = e.target;
    setUsers((users) =>
      users.map((user, i) =>
        i === index
          ? {
              ...user,
              [name]: value,
            }
          : user
      )
    );
  };

  const handleSubmit = (index) => async (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("vaccinator-name").doc(rowData);
      const ref = userRef.set(
        { ...users[index] }, // <-- user by index
        { merge: true }
      );
      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  //for Mui alert---
  const [open, setOpen] = useState(false); //for MUI ALERT

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //--------------------------------

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
        <Grid container direction="row" justifyContent="flex-start">
          <ButtonForm onClick={() => goToPrevPath()}>Back</ButtonForm>
        </Grid>
        {isLoading ? (
          <>
            {users &&
              users.map((user, index) => (
                <li style={{ listStyle: "none" }}>
                  <CardHeader title="Update Profile" />
                  <form onSubmit={handleSubmit(index)}>
                    <Grid container direction={"column"} spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          value={user.firstName}
                          variant="outlined"
                          label="First Name"
                          name="firstName" // <-- add name attribute
                          fullWidth
                          onChange={changeHandler(index)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          value={user.lastName}
                          variant="outlined"
                          label="Last Name"
                          name="lastName" // <-- add name attribute
                          fullWidth
                          onChange={changeHandler(index)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          value={user.phoneNumber}
                          variant="outlined"
                          label="Phone Number"
                          name="phoneNumber" // <-- add name attribute
                          onChange={changeHandler(index)}
                          fullWidth
                        />
                      </Grid>

                      <ButtonForm type="submit" onClick={() => handleClick()}>
                        Submit
                      </ButtonForm>
                    </Grid>
                  </form>
                </li>
              ))}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          // className={classes.snackBar}
        >
          <Alert onClose={handleClose} severity="success">
            Profile Updated!
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default EditVaccinator;
