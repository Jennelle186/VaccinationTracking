import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import AvailableVaccine from "../../../components/AvailabilityVaccines/availableVaccine";
import GraphMonth from "../Graph/graphMonth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  graph: {
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "12px",
    backgroundColor: "#add8e6",
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
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="6">
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
      </Grid>
      <br />
      <Grid item xs="12">
        {" "}
        <AvailableVaccine className={classes.announcement} />
      </Grid>

      {/*-----------------------Graph Below -----------------------------------------*/}
      <Card className={classes.graph} elevation={10}>
        <GraphMonth />
      </Card>
    </div>
  );
};

export default Dashboard;
