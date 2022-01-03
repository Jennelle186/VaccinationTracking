import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import ButtonForm from "./../Forms/Button/button";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { auth } from "../../Firebase/utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#2196F3",
  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const paperStyle = {
    //padding: 20,
    // width: 350,
    //margin: "20px auto",
    //padding: "3rem",

    height: "30%",
    width: "35%",
    margin: "13px auto",
    padding: "2rem",
    marginTop: "8%",
  };

  const btn = {
    margin: "1rem 0",
    width: "100%",
  };

  const resetForm = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
          alert("Reset Password Link sent to your account");
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          setErrors(err);
        });
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
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatar}></Avatar>
          <h2>Reset Password</h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="standard1"
            label="Email"
            fullWidth
            required
            autoComplete
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              errors.length > 0 && (
                <ul>
                  {errors.map((e, index) => {
                    return <li key={index}>{e}</li>;
                  })}
                </ul>
              )
            }
            helperText={errors}
          />
          <br />

          <ButtonForm fullWidth style={btn} type="submit">
            Reset Password
          </ButtonForm>

          <Typography>
            Return to Login page?
            <Link to="/login">Log In</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default withRouter(ForgotPassword);
