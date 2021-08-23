import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddVaccine from "../../Components/AddVaccine/addVaccine";
import ButtonForm from "../../../components/Forms/Button/button";
import { DialogBtn } from "../../../components/Forms/DialogButton/dialogBtn";
import {
  makeStyles,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
} from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const VaccinePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
            <ButtonForm>Back</ButtonForm>
          </Link>
        </Grid>
        <Grid item>
          <ButtonForm onClick={handleClickOpen}>Add Vaccines</ButtonForm>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Add Vaccinator Name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <AddVaccine />
          </DialogContentText>
        </DialogContent>
        <DialogBtn handleClose={handleClose}></DialogBtn>
      </Dialog>
    </div>
  );
};

export default VaccinePage;
