import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(1),
    color: " #fff",
    backgroundColor: "#2196F3",
    "&:hover": {
      backgroundColor: " #E3F2FD",
      color: "#000",
    },
  },
}));

const ButtonForm = ({ children, ...otherProps }) => {
  const classes = useStyles();
  return (
    <Typography align="center">
      <Button
        variant="contained"
        size="large"
        {...otherProps}
        className={classes.root}
      >
        {children}
      </Button>
    </Typography>
  );
};

export default ButtonForm;
