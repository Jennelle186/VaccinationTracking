import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";

//icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Delete from "@material-ui/icons/Delete";

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
          <Link to="#" className={classes.link}>
            <ButtonForm>
              <AddIcon /> Add Announcement
            </ButtonForm>
          </Link>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            lg={6}
            sm={4}
            md={6}
            style={{
              textAlign: "center",
            }}
          >
            <Grid container justify="flex-start">
              <Card className={classes.root}>
                <CardHeader
                  title="Name of vaccine"
                  action={
                    <IconButton aria-lable="edit" style={{ color: "green" }}>
                      <EditIcon />
                    </IconButton>
                  }
                />
                <CardContent>Schedule</CardContent>
                <CardActions style={{ justifyContent: "flex-end" }}>
                  <IconButton
                    aria-label="delete"
                    edge="end"
                    style={{ color: "#c70000 " }}
                  >
                    <DeleteIcon edge="end" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default AnnouncementPage;
