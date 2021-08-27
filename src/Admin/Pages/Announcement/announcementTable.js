import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { firestore } from "../../../Firebase/utils";
import parse from "html-react-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
const AnnounceTable = (props) => {
  const [announcement, setAnnouncement] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { row } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("announcement")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setAnnouncement(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEdit = (uid) => {
    props.history.push("/edit-announcement", uid);
  };
  const handleDelete = (uid) => {
    try {
      const userRef = firestore
        .collection("announcement")
        .doc(uid)
        .delete()
        .then(() => {
          console.log("saved");
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover>
                <TableCell> </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcement &&
                announcement.map((index, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {index.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(
                        index.createdDate.seconds * 1000
                      ).toDateString()}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => handleEdit(`${index.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleDelete(`${index.id}`);
                        }}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableBody>
                      <Collapse in={open} timeout="auto" unmountOnExit={true}>
                        {parse(index.text)}
                      </Collapse>
                    </TableBody>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default withRouter(AnnounceTable);
