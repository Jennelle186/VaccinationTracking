import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, TextField, CardHeader, Grid, Snackbar } from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";
import ButtonForm from "../../../components/Forms/Button/button";
import MuiAlert from "@material-ui/lab/Alert";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditAnnouncement = () => {
  const location = useLocation();
  const rowData = location.state;
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [announcement, setAnnouncement] = useState([]);
  const [text, setText] = useState("");

  const goToPrevPath = () => {
    history.goBack();
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("announcement")
      .doc(rowData)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setAnnouncement(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const changeHandler = (index) => (e) => {
    const { name, value } = e.target;
    setAnnouncement((announcements) =>
      announcements.map((announcement, i) =>
        i === index
          ? {
              ...announcement,
              [name]: value,
            }
          : announcement
      )
    );
  };

  const handleSubmit = (index) => async (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("announcement").doc(rowData);
      const ref = userRef.set(
        { ...announcements[index] }, // <-- user by index
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
      <Grid container direction="row" justifyContent="flex-start">
        <ButtonForm onClick={() => goToPrevPath()}>Back</ButtonForm>
      </Grid>
      {isLoading ? (
        <>
          {announcement &&
            announcement.map((announcement, index) => (
              <li style={{ listStyle: "none" }}>
                <CardHeader title="Update Announcement" />
                <form onSubmit={handleSubmit(index)}>
                  <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                      <TextField
                        type="text"
                        value={announcement.title}
                        label="Title"
                        name="vaccine" // <-- add name attribute
                        fullWidth
                        onChange={changeHandler(index)}
                      />
                    </Grid>
                    <Grid item>
                      <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor1) => {
                          const data = editor1.getData();
                          setText(data);
                        }}
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
          Announcement Updated!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditAnnouncement;
