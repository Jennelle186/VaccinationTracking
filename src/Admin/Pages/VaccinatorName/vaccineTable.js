import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Card,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { firestore } from "../../../Firebase/utils";

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

const VaccinatorTable = () => {
  const classes = useStyles();
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

  return (
    <Card elevation={10} className={classes.card}>
      <Table ria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {names &&
            names.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell numeric>{user.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => console.log(`${user.id}`)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default VaccinatorTable;
