import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Card,
  Divider,
  Grid,
} from "@material-ui/core";
import ButtonForm from "./../Forms/Button/button";
import { firestore } from "../../Firebase/utils";

import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginBottom: "1rem",
    padding: "1rem",
  },
  li: {
    listStyle: "none",
    textAlign: "left",
  },
});

const checkboxes = [
  { id: 1, text: "Fever" },
  { id: 2, text: "Headache" },
  { id: 3, text: "Nausea" },
];

const SideEffects = (props) => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [others, setOthers] = useState("");
  const [state, setState] = useState({
    Fever: false,
    Headache: false,
    Nausea: false,
    "Muscle Pain": false,
  });
  const handleCheckbox = (event) => {
    console.log(event.target.value);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [users, setUsers] = useState([]); //variable for storing user data info in an array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore
        .collection("users")
        .doc(currentUser.id)
        .onSnapshot((snapshot) => {
          const arr = [];
          arr.push({
            ...snapshot.data(),
          });

          setUsers(arr);
          setLoading(true);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sideEffects1 = { ...state };
    for (const p in sideEffects1) {
      if (!sideEffects1[p]) delete sideEffects1[p];
    }
    try {
      const userRef = firestore.collection("users").doc(currentUser.id);
      const ref = userRef.set(
        {
          1: {
            sideEffects1,
            others,
          },
        },
        { merge: true }
      );
      console.log(" saved");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const sideEffects2 = { ...state };
    for (const p in sideEffects2) {
      if (!sideEffects2[p]) delete sideEffects2[p];
    }
    try {
      const userRef = firestore.collection("users").doc(currentUser.id);
      const ref = userRef.set(
        {
          2: {
            sideEffects2,
            others,
          },
        },
        { merge: true }
      );
      console.log(" saved");
    } catch (error) {
      console.log(error);
    }
  };

  let ar = [];
  const userItems1 = users[0]?.[1]?.sideEffects1;
  if (userItems1) {
    for (const [key, value] of Object.entries(userItems1)) {
      ar.push(key, <br />);
    }
  }

  let ar2 = [];
  const userItems2 = users[0]?.[2]?.sideEffects2;
  if (userItems2) {
    for (const [key, value] of Object.entries(userItems2)) {
      ar2.push(key, <br />);
    }
  }

  return (
    <Container>
      {users &&
        users.map((user) => (
          <li className={classes.li}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <li> Vaccine:{user.doses?.selectedVaccine}</li>
                <li>
                  First Dose:
                  {new Date(
                    user.doses?.firstDose.seconds * 1000
                  ).toDateString()}
                </li>
                <li>Vaccinator: {user.doses?.firstVaccinator}</li>
                <li>
                  {user.doses?.selectedVaccine !== "J&J" ? (
                    <>
                      {" "}
                      2nd dose:{" "}
                      {new Date(
                        user.doses?.secondDose.seconds * 1000
                      ).toDateString()}{" "}
                      <li>Vaccinator: {user.doses?.secondVaccinator}</li>
                    </>
                  ) : (
                    <></>
                  )}
                </li>

                <Divider />
                <Typography>Side Effects you've experienced: </Typography>
                <Typography>
                  First dosage:
                  <li>{user["1"]?.others}</li>
                  {ar && <li>{ar}</li>}
                </Typography>
                <Divider />
                <Typography>
                  Second dosage:
                  <li>{user["2"]?.others}</li>
                  {ar2 && <li>{ar2}</li>}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                {user.doses?.dose1 == true && user.doses?.dose2 == false ? (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <Card className={classes.root} elevation={5}>
                        {user.doses?.selectedVaccine} - 1st Dose side effects
                        <FormGroup
                          style={{ alignContent: "center", padding: "1rem" }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Fever}
                                name="Fever"
                                color="primary"
                                value="Fever"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Fever"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Headache}
                                name="Headache"
                                color="primary"
                                value="Headache"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Headache"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Nausea}
                                name="Nausea"
                                color="primary"
                                value="Nausea"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Nausea"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state["Muscle Pain"]}
                                name="Muscle Pain"
                                color="primary"
                                value="Muscle Pain"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Muscle Pain"
                          />
                          <TextField
                            type="text"
                            label="Ohers:"
                            value={others}
                            onChange={(e) => setOthers(e.target.value)}
                            multiline
                          />
                        </FormGroup>
                        <ButtonForm type="submit">Submit</ButtonForm>
                      </Card>
                      <br />
                    </form>
                  </div>
                ) : (
                  <div></div>
                )}
                {user.doses?.dose2 == true ? (
                  <div>
                    <form onSubmit={handleSubmit2}>
                      <Card className={classes.root} elevation={5}>
                        {user.doses?.selectedVaccine} - 2nd Dose side effects
                        <FormGroup
                          style={{ alignContent: "center", padding: "1rem" }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Fever}
                                name="Fever"
                                color="primary"
                                value="Fever"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Fever"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Headache}
                                name="Headache"
                                color="primary"
                                value="Headache"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Headache"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.Nausea}
                                name="Nausea"
                                color="primary"
                                value="Nausea"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Nausea"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state["Muscle Pain"]}
                                name="Muscle Pain"
                                color="primary"
                                value="Muscle Pain"
                                onChange={handleCheckbox}
                              />
                            }
                            label="Muscle Pain"
                          />
                          <TextField
                            type="text"
                            label="Ohers:"
                            value={others}
                            onChange={(e) => setOthers(e.target.value)}
                            multiline
                          />
                        </FormGroup>
                        <ButtonForm type="submit">Submit</ButtonForm>
                      </Card>
                      <br />
                    </form>
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </li>
        ))}
    </Container>
  );
};

export default SideEffects;
