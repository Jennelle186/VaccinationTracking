import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Grid, makeStyles } from "@material-ui/core";

import ButtonForm from "../../../components/Forms/Button/button";

//icons
import AddIcon from "@material-ui/icons/Add";

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

const AnnouncementPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <Typography variant="h5">Announcement </Typography>
        <Grid container justify="flex-end">
          <Link to="/add-announcement" className={classes.link}>
            <ButtonForm>
              <AddIcon /> Add Announcement
            </ButtonForm>
          </Link>
        </Grid>
      </Card>
    </div>
  );
};

export default AnnouncementPage;
