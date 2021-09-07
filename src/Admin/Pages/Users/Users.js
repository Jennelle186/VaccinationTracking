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
    "First Vaccinator",
    "2nd Dose",
    "Second Vaccinator",
  ];
  options = {
    filter: true,
    selectableRows: "none",
  };

  componentDidMount() {
    firestore
      .collection("users")
      .orderBy("doses.firstDose", "desc") //with order by it will not show users who were not vaccinated
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
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
            Vaccine: data.doses?.selectedVaccine,

            ...(data.doses?.selectedVaccine == "J&J"
              ? {
                  "1st Dose": new Date(
                    data.doses?.firstDose.seconds * 1000
                  ).toDateString(),
                  "First Vaccinator": data.doses?.firstVaccinator,
                }
              : {
                  "1st Dose": new Date(
                    data.doses?.firstDose.seconds * 1000
                  ).toDateString(),
                  "First Vaccinator": data.doses?.firstVaccinator,
                  "2nd Dose": new Date(
                    data.doses?.secondDose.seconds * 1000
                  ).toDateString(),
                  "Second Vaccinator": data.doses?.secondVaccinator,
                }),
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
