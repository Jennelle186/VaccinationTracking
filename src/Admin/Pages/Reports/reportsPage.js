import React from "react";
import ChartWithSelect from "../../Components/Graph/chartWithSelect";
import VaccineGraph from "../../Components/Graph/vaccineGraph";
import { Typography } from "@material-ui/core";

const ReportsPage = () => {
  return (
    <div>
      <div>
        <Typography variant="h5">Vaccination Reports</Typography>
        <Typography variant="subtitle2">
          Select the type of vaccine to view the reports
        </Typography>
        <VaccineGraph />
      </div>
      <div>
        <br /> <Typography variant="h5">Side Effects Reports</Typography>
        <Typography variant="subtitle2">
          Select the type of vaccine to view the reports
        </Typography>
        <ChartWithSelect />
      </div>
    </div>
  );
};

export default ReportsPage;
