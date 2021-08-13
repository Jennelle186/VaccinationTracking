import React, { Component } from "react";
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
    "Vaccine",
    "At least 1 dose",
    "Fully Vaccinated",
  ];
  options = {
    filter: true,
    selectableRows: "none",
  };

  //   componentDidMount() {
  //     firestore
  //       .collection("users")
  //       .get()
  //       .then((snapshot) => {
  //         const users = [];
  //         snapshot.forEach((doc) => {
  //           const data = doc.data();
  //           users.push({
  //             "Display Name": data.displayName,
  //             Email: data.email,
  //             // Address: data.street + "," + data.Barangay,
  //             ...(data.street && data.Barangay
  //               ? {
  //                   Address: data.street + "," + data.Barangay,
  //                 }
  //               : {}),
  //             "Phone Number": data.phone,
  //           });
  //         });
  //         this.setState({ users: users });
  //         // console.log(snapshot)
  //       })
  //       .catch((error) => console.log(error));
  //   }

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