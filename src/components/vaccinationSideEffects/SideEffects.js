import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Card,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@material-ui/core";
import ButtonForm from "./../Forms/Button/button";
import { firestore } from "../../Firebase/utils";

import { useSelector } from "react-redux";
import firebase from "firebase/app";

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
            others: firebase.firestore.FieldValue.arrayUnion(others),
          },
        },
        { merge: true }
      );
      // console.log(" saved");
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
            others: firebase.firestore.FieldValue.arrayUnion(others),
          },
        },
        { merge: true }
      );
      // console.log(" saved");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    const sideEffects3 = { ...state };
    for (const p in sideEffects3) {
      if (!sideEffects3[p]) delete sideEffects3[p];
    }
    try {
      const userRef = firestore.collection("users").doc(currentUser.id);
      const ref = userRef.set(
        {
          3: {
            sideEffects3,
            others: firebase.firestore.FieldValue.arrayUnion(others),
          },
        },
        { merge: true }
      );
      // console.log(" saved");
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

  let ar3 = [];
  const userItems3 = users[0]?.[3]?.sideEffects3;
  if (userItems3) {
    for (const [key, value] of Object.entries(userItems3)) {
      ar3.push(key, <br />);
    }
  }

  function display(others) {
    if (typeof others === "string") return others;
    return others?.join(", ");
  }

  return (
    <Container>
      {users &&
        users.map((user) => (
          <li className={classes.li}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableCell></TableCell>
                      <TableCell>Vaccine Information</TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{user.doses?.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vaccine</TableCell>
                        <TableCell>{user.doses?.selectedVaccine}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>First Dose</b>
                        </TableCell>
                        <TableCell>
                          {user.doses?.firstDose
                            ? new Date(
                                user.doses?.firstDose.seconds * 1000
                              ).toDateString()
                            : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Batch No.</TableCell>
                        <TableCell>{user.doses?.batchNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>First Dose Vaccinator</TableCell>
                        <TableCell>{user.doses?.firstVaccinator}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Side Effects</TableCell>
                        <TableCell>
                          {display(user[1]?.others)}
                          {ar && <li>{ar}</li>}{" "}
                        </TableCell>
                      </TableRow>

                      {user.doses?.selectedVaccine !== "J&J" ? (
                        <>
                          <TableRow>
                            <TableCell>
                              <b>Second Dose</b>
                            </TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.secondDose
                                ? new Date(
                                    user.doses?.secondDose.seconds * 1000
                                  ).toDateString()
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Batch No</TableCell>
                            <TableCell>{user.doses?.batchNo2}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Second Dose Vaccinator</TableCell>
                            <TableCell>
                              {user.doses?.secondVaccinator}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Side Effects</TableCell>
                            <TableCell>
                              {ar2.length == 0 ? ( //if array of ar2 is == 0
                                <></> //if true, show nothing
                              ) : (
                                <>
                                  <li> {display(user[2]?.others)}</li>
                                  {ar2 && <li>{ar2}</li>}
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <b>Booster Vaccine</b>
                            </TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.selectedBooster}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Batch No</TableCell>
                            <TableCell> {user.doses?.batchNo3}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Booster Date</TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.boosterDate
                                ? new Date(
                                    user.doses?.boosterDate.seconds * 1000
                                  ).toDateString()
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Vaccinator</TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.boosterVaccinator}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Side Effects</TableCell>
                            <TableCell>
                              {display(user[3]?.others)}
                              {ar3 && <li>{ar3}</li>}{" "}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          {" "}
                          <TableRow>
                            <TableCell>
                              <b>Booster Vaccine</b>
                            </TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.selectedBooster}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Batch No</TableCell>
                            <TableCell> {user.doses?.batchNo3}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Booster Date</TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.boosterDate
                                ? new Date(
                                    user.doses?.boosterDate.seconds * 1000
                                  ).toDateString()
                                : ""}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Vaccinator</TableCell>
                            <TableCell>
                              {" "}
                              {user.doses?.boosterVaccinator}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Side Effects</TableCell>
                            <TableCell>
                              {display(user[3]?.others)}
                              {ar3 && <li>{ar3}</li>}{" "}
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                {user.doses?.dose1 == true &&
                user.doses?.dose2 == false &&
                user.doses?.selectedBooster === undefined ? (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <Card className={classes.root} elevation={5}>
                        1st Dose side effects
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
                            label="Others:"
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
                {user.doses?.dose2 == true &&
                user.doses?.selectedBooster === undefined ? (
                  <div>
                    <form onSubmit={handleSubmit2}>
                      <Card className={classes.root} elevation={5}>
                        2nd Dose side effects
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
                            label="Others:"
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

                {user.doses?.selectedBooster ? (
                  <div>
                    {/* booster side effects here  */}
                    <form onSubmit={handleSubmit3}>
                      <Card className={classes.root} elevation={5}>
                        Booster side effects
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
                            label="Others:"
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
