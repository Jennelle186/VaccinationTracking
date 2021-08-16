import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { googleSignInStart } from "../../Redux/User/userActions";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#2196F3",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    // width: 350,
    margin: "20px auto",
    padding: "3rem",
  };

  const btn = {
    margin: "1.5rem 0",
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <Link to="/registration">Sign Up</Link>
          </Typography>
          {/* not sure here, just trying to see if firebase works */}
          <ButtonForm onClick={handleGoogleSignIn}>
            Continue with Gmail
          </ButtonForm>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
