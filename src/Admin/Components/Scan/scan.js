//those textfields are not yet final
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { firestore } from "../../../Firebase/utils";
import SelectVaccinator from "../SelectVaccinator/selectVaccinator";
import SelectVaccine from "../SelectVaccine/selectVaccine";

import Scan2ndDose from "./scan2ndDose";
import parse from "date-fns/parse";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
  },
});

const Scan = ({ scanResult }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setID] = useState("");
  const [ctrlNumber, setCtrlNumber] = useState("");
  const [firstDose, setFirstDose] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());
  const [users, setUsers] = useState([]); //variable for storing user data info in an array

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(scanResult)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setUsers(arr);
        setIsLoading(true);
        // console.log(JSON.stringify(arr));
      });

    return () => {
      unsubscribe();
    };
  }, []);

  //useEffect for the vaccinator name;------------------------
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

  //first selected value vaccinator names
  const [firstVaccinator, setFirstVaccinator] = useState("");
  const [secondVaccinator, setSecondVaccintor] = useState("");
  const handleChange = (e) => setFirstVaccinator(e.target.value);
  const handleChange2 = (e) => setSecondVaccintor(e.target.value);
  //2nd selected value vaccinator names----------------------------

  //for the vaccines-------------------------------------------------
  const [vaccines, setVaccines] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccines")
      .where("availability", "==", true)
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setVaccines(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
  //--------------------------------------------------------------------

  //for the estimated 2nd Dose of vaccine logic--------------------------
  const [secDose, setSecDose] = useState(new Date()); //variable for 2nd dose //could remove toISOString
  useEffect(() => {
    if (selectedVaccine) {
      const { daysApart } = vaccines.find(
        (vaccine) => vaccine.vaccine === selectedVaccine
      );
      const doseDate = new Date();

      let x = parseInt(daysApart);

      //--------
      doseDate.setDate(doseDate.getDate() + x);
      setSecDose(
        `${
          doseDate.getMonth() + 1
        }/${doseDate.getDate()}/${doseDate.getFullYear()}`
      );
    }
  }, [selectedVaccine]);
  //for the estimated 2nd Dose of vaccine logic------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userRef = firestore.collection("users").doc(scanResult);
      const ref = userRef.set(
        {
          doses: {
            selectedVaccine,
            dose1,
            firstDose,
            firstVaccinator,
            dose2,
            secDose,
            secondVaccinator,
          },
        },
        { merge: true }
      );

      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  const [dose1, setDose1] = useState(false);
  const [dose2, setDose2] = useState(false);
  useEffect(() => {
    if (firstVaccinator) {
      setDose1(true);
    }
  }, [firstVaccinator]);

  useEffect(() => {
    if (secondVaccinator) {
      setDose2(true);
    }
  }, [firstVaccinator]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Update Vaccination Status" />
      <CardContent>
        {isLoading ? (
          <>
            {users &&
              users.map((user) => (
                <li style={{ listStyle: "none" }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container direction={"column"} spacing={2}>
                      <Grid item>
                        <TextField
                          label="ID No"
                          variant="outlined"
                          value={id}
                          onChange={(e) => setID(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          value={user.firstName}
                          fullWidth
                          disabled={true}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Middle Name (Optional)"
                          variant="outlined"
                          value={user.middleName}
                          fullWidth
                          disabled={true}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          value={user.lastName}
                          fullWidth
                          disabled={true}
                        />
                      </Grid>
                      <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            format="MM/dd/yyyy"
                            value={user.birthdate}
                            onChange={handleDateChange}
                            fullWidth
                            id="date-picker-inline"
                            label="BirthDate"
                            disabled={true}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          value={user.address}
                          label="Address"
                          variant="outlined"
                          fullWidth
                          disabled={true}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          value={user.phoneNumber}
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          disabled={true}
                        />
                      </Grid>

                      <Grid item>
                        <SelectVaccine
                          value={selectedVaccine}
                          onChange={handleChangeVaccine}
                          vaccines={vaccines}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          label="Control Number of the Vaccine "
                          variant="outlined"
                          fullWidth
                          value={ctrlNumber}
                          onChange={(e) => setCtrlNumber(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          label="1st Dosage"
                          variant="outlined"
                          value={firstDose}
                          onChange={(e) => setFirstDose(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item>
                        <SelectVaccinator
                          value={firstVaccinator}
                          onChange={handleChange}
                          names={names}
                        />
                      </Grid>

                      <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            format="MM/dd/yyyy"
                            value={secDose}
                            onChange={setSecDose}
                            fullWidth
                            id="date-picker-inline"
                            label="Estimated 2nd Dose of Vaccination"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item>
                        <SelectVaccinator
                          value={secondVaccinator}
                          onChange={handleChange2}
                          names={names}
                        />
                      </Grid>

                      <br />
                      <Grid>
                        <ButtonForm type="submit" fullWidth>
                          Submit
                        </ButtonForm>
                      </Grid>
                    </Grid>
                  </form>
                </li>
              ))}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </CardContent>
    </Card>
  );
};

export default Scan;
