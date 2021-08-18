import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ButtonForm from "./../Forms/Button/button";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { auth, handleUserProfile } from "../../Firebase/utils";
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#2196F3",
  },
}));

const SignUp = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password does not match."];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user);
      resetForm();
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
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
          <h2>Sign up</h2>
        </Grid>

        {/* {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )} */}

        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="standard1"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            autoComplete
          />
          <br />
          <TextField
            type="password"
            id="standard2"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete
            error={
              errors.length > 0 && (
                <ul>
                  {errors.map((err, index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </ul>
              )
            }
            helperText={errors}
          />
          <TextField
            type="password"
            id="standard2"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            autoComplete
            error={
              errors.length > 0 && (
                <ul>
                  {errors.map((err, index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </ul>
              )
            }
            helperText={errors}
          />

          <ButtonForm fullWidth style={btn} type="submit">
            sign up
          </ButtonForm>

          <Typography>
            Already have an account?
            <Link to="/login">Log In</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default withRouter(SignUp);
