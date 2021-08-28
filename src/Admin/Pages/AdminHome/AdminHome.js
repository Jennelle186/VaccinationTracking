import React, { useState, useEffect } from "react";
import Dashboard from "../../Components/Dashboard/dashboard";
import BarChart from "../../Components/Charts/BarChart";
import VaccineGraph from "../../Components/Graph/vaccineGraph";

const AdminHome = () => {
  return (
    <div>
      <Dashboard />
      <VaccineGraph />
      {/* <BarChart /> */}
    </div>
  );
};

export default AdminHome;
