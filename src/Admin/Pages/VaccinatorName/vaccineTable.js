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
  TablePagination,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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

  const handleDelete = async (uid) => {
    try {
      const userRef = firestore
        .collection("vaccinator-name")
        .doc(uid)
        .delete()
        .then(() => {
          // console.log("saved");
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (uid) => {
    console.log(uid);
    props.history.push("/edit-vaccinator", uid);
  };

  //----------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, names.length - page * rowsPerPage);
  //---------------------------------------

  return (
    <Card elevation={10} className={classes.card}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {names &&
            names
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover>
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell numeric>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "green" }}
                      onClick={() => handleEdit(`${user.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleDelete(`${user.id}`);
                        handleClick();
                      }}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={names.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
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
