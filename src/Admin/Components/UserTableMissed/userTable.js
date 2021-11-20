import React, { Component, useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "../../../Firebase/utils";
import { withRouter } from "react-router-dom";

const UserTable = (props) => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      name: "id",
      label: "System ID",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "doses",
      label: "ID No.",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value.id;
        },
      },
    },
    {
      name: "doses",
      label: "Category",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value.category;
        },
      },
    },

    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "middleName",
      label: "Middle Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "doses",
      label: "Vaccine",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value.selectedVaccine;
        },
      },
    },
    {
      name: "doses",
      label: "Expected 2nd Dose",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return new Date(value.secondDose.seconds * 1000).toDateString();
        },
      },
    },
  ];

  const getUsers = async () => {
    const people = await firestore
      .collection("users")
      //   .where("doses.selectedVaccine", "!=", "J&J")
      .where("doses.secondDose", "<=", new Date())
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setUsers(arr);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleRowClick = (rowData, rowMeta) => {
    props.history.push("/user-details", `${rowData[0]}`);
  };

  const options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
    onRowClick: handleRowClick,
  };

  const selection = users.filter(
    (d) => d?.doses?.dose2 == false && d?.doses?.selectedVaccine !== "J&J"
  );

  return (
    <div>
      <div style={{ float: "left" }}>
        <h4>Date of today: {new Date().toDateString()}</h4>
      </div>
      <br />
      <br /> <br />
      <MUIDataTable columns={columns} data={selection} options={options} />
    </div>
  );
};
export default withRouter(UserTable);
