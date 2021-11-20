import React, { Component } from "react";
import { firestore } from "../../../Firebase/utils";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      open: false,
    };
  }

  handleRowClick = (rowData, rowMeta) => {
    this.props.history.push("/user-details", `${rowData[0]}`);
  };

  columns = [
    "User ID",
    "ID No",
    "Category",
    "Name",
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
    responsive: "simple",
    onRowClick: this.handleRowClick,
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
            "User ID": doc.id,
            "ID No": data.doses.id,
            Category: data.doses?.category,
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
    return this.state.orders ? (
      <div>
        <div style={{ float: "left" }}>
          <h2>List of Users</h2>
        </div>
        <br />
        <br /> <br />
        <MUIDataTable
          columns={this.columns}
          data={this.state.users}
          options={this.options}
        />
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}
export default withRouter(Users);
