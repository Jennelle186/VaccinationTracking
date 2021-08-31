import React from "react";
import ChartWithSelect from "../../Components/Graph/chartWithSelect";
import { Typography } from "@material-ui/core";

const ReportsPage = () => {
  return (
    <div>
      <Typography variant="h5">Side Effects Reports</Typography>
      <Typography variant="subtitle2">
        Select the type of vaccine to view the reports
      </Typography>

      <ChartWithSelect />
    </div>
  );
};

export default ReportsPage;
