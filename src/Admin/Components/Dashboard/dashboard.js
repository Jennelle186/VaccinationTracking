import React from "react";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  Paper,
  CardHeader,
} from "@material-ui/core";
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
        <Grid item>
          <Card elevation={10}>
            <CardContent>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                ></Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonForm>Scan QR Code</ButtonForm>
                    </Grid>
                    <Grid item>
                      <ButtonForm>Add Vaccine</ButtonForm>
                    </Grid>
                    <Grid item>
                      <ButtonForm>Add Vaccinator Name</ButtonForm>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card elevation={5} style={{ marginLeft: "1rem", padding: "1rem" }}>
            <CardHeader title="Announcement of vaccines" />
          </Card>
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
