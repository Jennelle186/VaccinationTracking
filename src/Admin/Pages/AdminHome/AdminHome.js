import React from "react";
import Dashboard from "../../Components/Dashboard/dashboard";
import UserTable from "../../Components/UserTableMissed/userTable";

const AdminHome = () => {
  return (
    <div>
      <Dashboard />
      <br />
      <h2>Users who have missed their 2nd dose</h2>
      <UserTable />
    </div>
  );
};

export default AdminHome;
