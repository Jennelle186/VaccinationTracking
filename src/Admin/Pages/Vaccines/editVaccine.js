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

const EditVaccine = () => {
  const location = useLocation();
  const rowData = location.state;
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [stocks, setStocks] = useState(0);

  const goToPrevPath = () => {
    history.goBack();
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccines")
      .doc(rowData)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setVaccines(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const changeHandler = (index) => (e) => {
    const { name, value } = e.target;
    setVaccines((vaccines) =>
      vaccines.map((vaccine, i) =>
        i === index
          ? {
              ...vaccine,
              [name]: value,
            }
          : vaccine
      )
    );
  };

  const handleSubmit = (index) => async (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("vaccines").doc(rowData);
      const ref = userRef.set(
        { ...vaccines[index], stocks: Number(stocks) }, // <-- user by index
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
            {vaccines &&
              vaccines.map((vaccine, index) => (
                <li style={{ listStyle: "none" }}>
                  <CardHeader title="Update Vaccine" />
                  <form onSubmit={handleSubmit(index)}>
                    <Grid container direction={"column"} spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          value={vaccine.vaccine}
                          variant="outlined"
                          label="First Name"
                          name="vaccine" // <-- add name attribute
                          fullWidth
                          onChange={changeHandler(index)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="text"
                          value={vaccine.dose}
                          variant="outlined"
                          label="Number of Dose"
                          name="dose" // <-- add name attribute
                          fullWidth
                          onChange={changeHandler(index)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="number"
                          value={vaccine.daysApart}
                          variant="outlined"
                          label="Days Apart"
                          name="daysApart" // <-- add name attribute
                          fullWidth
                          onChange={changeHandler(index)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="number"
                          value={stocks}
                          variant="outlined"
                          label="Stocks"
                          // name="stocks" // <-- add name attribute
                          fullWidth
                          onChange={(e) => setStocks(Number(e.target.value))}
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
            Vaccine Updated!
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default EditVaccine;
