import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Card,
  IconButton,
  Button,
  Snackbar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { firestore } from "../../../Firebase/utils";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cell: {
    fontSize: "medium",
  },
  card: {
    marginTop: "1rem",
  },
  link: {
    textDecoration: "none",
  },
});

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const VaccinatorTable = (props) => {
  const classes = useStyles();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState([]);

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

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccines")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setNames(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const toInactive = (uid) => {
    try {
      const ref = firestore.collection("vaccines").doc(uid);
      const res = ref.set(
        {
          availability: false,
        },
        { merge: true }
      );
      alert("Succesfull set to Inactive");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toActive = (uid) => {
    try {
      const ref = firestore.collection("vaccines").doc(uid);
      const res = ref.set(
        {
          availability: true,
        },
        { merge: true }
      );
      alert("Succesfull set to Active");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (uid) => {
    props.history.push("/edit-vaccine", uid);
  };

  return (
    <Card elevation={10} className={classes.card}>
      {isLoading ? (
        <>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Vaccine</TableCell>
                <TableCell>No. of Dose</TableCell>
                <TableCell>Days Apart</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {names &&
                names.map((index) => (
                  <TableRow hover>
                    <TableCell component="th" scope="row">
                      {index.vaccine}
                    </TableCell>
                    <TableCell>{index.dose}</TableCell>
                    <TableCell numeric>{index.daysApart}</TableCell>
                    <TableCell>
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => handleEdit(`${index.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {index.availability == true ? (
                        <Button
                          variant="outlined"
                          style={{
                            borderColor: "#397D02",
                            color: "#397D02",
                          }}
                          onClick={() => toInactive(index.id)}
                        >
                          Available
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => toActive(index.id)}
                        >
                          Unavailable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <h1>Loading...</h1>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.snackBar}
      >
        <Alert onClose={handleClose} severity="success">
          Profile Deleted!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default withRouter(VaccinatorTable);
