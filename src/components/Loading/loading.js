import React from "react";
import {
  Grid,
  makeStyles,
  Backdrop,
  Typography,
  CircularProgress,
} from "@material-ui/core";
// import logo from "../../assets/jojvaccine.gif";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    opacity: "0.5",
    backgroundColor: "white",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {/* <img src={logo} width="30%" alt="logo" /> */}
          <CircularProgress />
        </Grid>
        <Grid item>
          <Typography variant="h5">Loading...</Typography>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default Loading;
