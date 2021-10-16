import React from "react";
import ChartWithSelect from "../../Components/Graph/chartWithSelect";
import VaccineGraph from "../../Components/Graph/vaccineGraph";
import OthersList from "../../Components/Graph/othersList";
import PieGraph from "../../Components/Graph/pieGraph";
import { Typography, Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "12px",
  },
}));

const ReportsPage = () => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Card className={classes.card} elevation={10}>
          <Typography variant="h5">Vaccination Reports</Typography>

          <Typography variant="subtitle2">
            Select the type of vaccine to view the reports
          </Typography>

          <VaccineGraph />
        </Card>
      </div>
      <div>
        <Card className={classes.card} elevation={10}>
          <br /> <Typography variant="h5">Side Effects Reports</Typography>
          <Typography variant="subtitle2">
            Select the type of vaccine to view the reports
          </Typography>
          <ChartWithSelect />
        </Card>
      </div>
      <div>
        <Card className={classes.card} elevation={10}>
          <OthersList />
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
