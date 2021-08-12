import React from "react";
import { Grid, makeStyles, Card, Typography } from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  graph: {
    padding: "1rem",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs>
          <ButtonForm>Scan QR Code</ButtonForm>
        </Grid>
        <Grid item xs>
          <ButtonForm>Add Vaccine</ButtonForm>
        </Grid>
        <Grid item xs>
          <ButtonForm>Add Doctor (?)</ButtonForm>
        </Grid>
        <Grid item xs>
          <Card>Announcement here</Card>
        </Grid>
      </Grid>
      {/* Graph Below */}
      <h1>Graph Below Must be in a component</h1>
      <Card className={classes.graph}>
        <Typography variant="h5">Percentage of the Ayala Population</Typography>
      </Card>
    </div>
  );
};

export default Dashboard;
