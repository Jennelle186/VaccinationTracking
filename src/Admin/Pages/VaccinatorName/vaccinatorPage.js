import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Grid } from "@material-ui/core";
import AddVacinator from "../../Components/AddVacinator/AddVacinator";
import MUIDataTable from "mui-datatables";
import ButtonForm from "../../../components/Forms/Button/button";
import VaccinatorTable from "./vaccineTable";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const VaccinatorPage = (props) => {
  const classes = useStyles();

  // const columns = ["firstName", "lastName"];
  // const options = {
  //   filter: true,
  // };

  return (
    <div>
      {/* <AddVacinator /> */}

      {/* {names && names.map((user) => <li>{user.firstName + user.lastName}</li>)} */}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Link to="/admin" className={classes.link}>
            <ButtonForm className={classes.btn}>Back</ButtonForm>
          </Link>
        </Grid>
        <Grid item>
          <ButtonForm className={classes.btn}>Add Vaccinator</ButtonForm>
        </Grid>
      </Grid>
      <VaccinatorTable />
    </div>
  );
};

export default VaccinatorPage;
