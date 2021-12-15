import React from "react";
import Dashboard from "../../Components/Dashboard/dashboard";
import UserTable from "../../Components/UserTableMissed/userTable";
import { Typography } from "@material-ui/core";

const AdminHome = () => {
  return (
    <div>
      <Dashboard />
      <br />
      <Typography variant="h5">Users who have missed their 2nd dose</Typography>
      <UserTable />
    </div>
  );
};

export default AdminHome;
