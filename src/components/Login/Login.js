import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonForm from "./../Forms/Button/button";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
    padding: "3rem",
  };

  const btn = {
    margin: "1.5rem 0",
  };

  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: "#2196F3",
    },
  }));
  const classes = useStyles();

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatar}></Avatar>
          <h2>Login</h2>
        </Grid>

        <form>
          <TextField
            type="text"
            id="standard1"
            label="Name"
            fullWidth
            required
            autoComplete
          />
          <br />
          <br />
          <TextField
            type="password"
            id="standard2"
            label="Password"
            fullWidth
            required
            autoComplete
          />
          <ButtonForm fullWidth style={btn}>
            LOGIN
          </ButtonForm>

          {/* if may other mode of login- https://colorlib.com/wp/wp-content/uploads/sites/2/login-form-v11.jpg */}
          {/* <Typography>Or login with</Typography> */}

          <Typography>
            Do you have an account?
            <Link to="#">Sign Up</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
