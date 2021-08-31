import React, { Component } from "react";
import { firestore } from "../../../Firebase/utils";
import MUIDataTable from "mui-datatables";

class Users extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  //d pa sure dito sa columns, just that nilagyan lang ng table dito
  columns = [
    "Name",
    "Email",
    "Phone Number",
    "Address",
    "Vaccine",
    "1st Dose",
    "2nd Dose",
  ];
  options = {
    filter: true,
    selectableRows: "none",
  };

  componentDidMount() {
    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log("doses", data.doses);
          users.push({
            ...((data.firstName && data.lastName) || data.middleName == " "
              ? {
                  Name:
                    data.firstName +
                    " " +
                    data.middleName +
                    "." +
                    data.lastName,
                }
              : {}),
            Email: data.email,
            "Phone Number": data.phoneNumber,
            Address: data.address,
          });
        });
        this.setState({ users: users });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.users ? (
      <MUIDataTable
        title={"List of Users"}
        columns={this.columns}
        data={this.state.users}
        options={this.options}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Users;
