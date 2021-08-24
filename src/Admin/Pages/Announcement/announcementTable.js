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
import MUIDataTable from "mui-datatables";
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

  // useEffect(() => {
  //   const unsubscribe = firestore
  //     .collection("announcement")
  //     .onSnapshot((snapshot) => {
  //       const arr = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         arr.push({
  //           ID: doc.id,
  //           text: parse(data.text),
  //           Title: data.title,
  //           "Created Date": new Date(
  //             data.createdDate.seconds * 1000
  //           ).toDateString(),
  //         });
  //       });
  //       setAnnouncement(arr);
  //       setIsLoading(true);
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const columns = [
  //   "ID",
  //   "Title",
  //   // "text",
  //   "Created Date",
  //   {
  //     name: "Delete",
  //     options: {
  //       filter: true,
  //       sort: false,
  //       empty: true,
  //       customBodyRender: (value, tableMeta) => {
  //         return (
  //           <FormControlLabel
  //             value={value}
  //             control={
  //               <Button
  //                 value={value}
  //                 variant="outlined"
  //                 style={{ borderColor: "#397D02", color: "#397D02" }}
  //               >
  //                 Delete
  //               </Button>
  //             }
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               try {
  //                 firestore.collection("orders").doc(tableMeta.rowData[0]).set(
  //                   {
  //                     orderStatus: "Confirmed",
  //                   },
  //                   { merge: true }
  //                 );
  //               } catch (err) {
  //                 console.log(err);
  //               }
  //               // this.handleOpen();
  //             }}
  //           />
  //         );
  //       },
  //     },
  //   },
  //   {
  //     name: "text",
  //     label: "text",
  //     options: {
  //       setCellProps: () => ({
  //         style: { height: "1rem", overflow: "hidden", maxHeight: "50px" },
  //       }),
  //       // customBodyRender: (data, type, row) => {
  //       //   return <pre>{data}</pre>;
  //       // },
  //     },
  //   },
  // ];

  // const options = {
  //   filter: true,
  //   selectableRows: "none",
  //   responsive: "simple",
  //   expandableRows: true,
  //   rowsPerPage: 1,
  //   renderExpandableRow: (rowData, rowMeta) => {
  //     console.log(rowData, rowMeta);
  //     return (
  //       <TableRow>
  //         <TableCell colSpan={rowData.length}>
  //           {parse(JSON.stringify(rowData[4]))}
  //         </TableCell>
  //       </TableRow>
  //     ); //how do I render the `text` here from firestore?
  //   },
  // };

  return (
    <div>
      {/* <MUIDataTable
        title={"List of the Announcement"}
        columns={columns}
        data={announcement}
        options={options}
      /> */}
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcement &&
                announcement.map((index) => (
                  <TableRow hover>
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
                    <TableCell colSpan={6}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        {parse(index.text)}
                      </Collapse>
                    </TableCell>
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
