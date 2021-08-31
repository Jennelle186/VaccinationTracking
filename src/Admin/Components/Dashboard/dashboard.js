import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import AvailableVaccine from "../../../components/AvailabilityVaccines/availableVaccine";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  graph: {
    padding: "1rem",
  },
  link: {
    textDecoration: "none",
  },
  announcement: {
    marginLeft: "1rem",
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
                      <Link to="/scanQR-Code" className={classes.link}>
                        <ButtonForm>Scan QR Code</ButtonForm>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="add-vaccine" className={classes.link}>
                        <ButtonForm>Add Vaccine</ButtonForm>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/add-vaccinator" className={classes.link}>
                        <ButtonForm>Add Vaccinator Name</ButtonForm>
                      </Link>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.announcement}>
          <AvailableVaccine className={classes.announcement} />
        </Grid>
      </Grid>
      {/* Graph Below */}
      <h1>Graph Below Must be in a component</h1>
      <Card className={classes.graph}>
        {/* <Typography variant="h5">Percentage of the Ayala Population</Typography> */}
      </Card>
    </div>
  );
};

export default Dashboard;
