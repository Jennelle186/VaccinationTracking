import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  makeStyles,
  Grid,
  CardHeader,
  TextField,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import parse from "html-react-parser";

import { firestore } from "../../../Firebase/utils";

const useStyles = makeStyles({
  root: {
    // margin: "0 auto",
    marginBottom: "1rem",
    padding: "1rem",
  },
  link: {
    textDecoration: "none",
  },
});

const AddAnnouncement = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const createdDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const userRef = firestore.collection("announcement").doc();
      const ref = userRef.set({
        title,
        text,
        createdDate,
      });
      setText("");
      setTitle("");
      // console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Link to="/announcement" className={classes.link}>
            <ButtonForm>Back</ButtonForm>
          </Link>
        </Grid>
      </Grid>
      <Card className={classes.root}>
        <CardHeader title="Announcement" />
        <div className="editor">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor1) => {
                const data = editor1.getData();
                setText(data);
              }}
            />
            <br />
            <br />
            <ButtonForm type="submit">Submit</ButtonForm>
          </form>
        </div>
        <>{parse(text)}</>
      </Card>
    </>
  );
};

export default AddAnnouncement;
