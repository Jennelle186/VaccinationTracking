import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  Button,
} from "@material-ui/core";
import ButtonForm from "../../../components/Forms/Button/button";
import VaccinatorTable from "./vaccineTable";
import AddVacinator from "../../Components/AddVacinator/AddVacinator";

import { DialogBtn } from "../../../components/Forms/DialogButton/dialogBtn";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const VaccinatorPage = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
          <ButtonForm className={classes.btn} onClick={handleClickOpen}>
            Add Vaccinator
          </ButtonForm>
        </Grid>
      </Grid>
      <VaccinatorTable />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Add Vaccinator Name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <AddVacinator />
          </DialogContentText>
        </DialogContent>
        <DialogBtn handleClose={handleClose}></DialogBtn>
      </Dialog>
    </div>
  );
};

export default VaccinatorPage;
