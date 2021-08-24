import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";
import MUIDataTable from "mui-datatables";
const AnnounceTable = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [isLoading, setIsLoading] = useState();

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

  const columns = [
    "Title",
    "Created Date",
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              value={value}
              control={
                <Button
                  value={value}
                  variant="outlined"
                  style={{ borderColor: "#397D02", color: "#397D02" }}
                >
                  Delete
                </Button>
              }
              onClick={(e) => {
                e.stopPropagation();
                try {
                  firestore.collection("orders").doc(tableMeta.rowData[0]).set(
                    {
                      orderStatus: "Confirmed",
                    },
                    { merge: true }
                  );
                } catch (err) {
                  console.log(err);
                }
                // this.handleOpen();
              }}
            />
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(); //how do I render the `text` here from firestore?
    },
  };

  return (
    <div>
      {/* <MUIDataTable
        title={"List"}
        columns={columns}
        data={announcement}
        options={options}
      /> */}
      {isLoading ? (
        <>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcement &&
                announcement.map((index) => (
                  <TableRow hover>
                    <TableCell component="th" scope="row">
                      {index.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(
                        index.createdDate.seconds * 1000
                      ).toDateString()}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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

export default AnnounceTable;
