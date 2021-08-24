import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, makeStyles, Grid } from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";

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
      <Card className={classes.root}>Hello</Card>
    </>
  );
};

export default AddAnnouncement;
