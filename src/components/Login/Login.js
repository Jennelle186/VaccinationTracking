import React, { useState } from "react";
import { signInWithGoogle } from "../../Firebase/utils";
import { Link, withRouter } from "react-router-dom";
import ButtonForm from "./../Forms/Button/button";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  makeStyles,
  Button,
} from "@material-ui/core";
import { auth } from "../../Firebase/utils";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#2196F3",
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");

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

  const classes = useStyles();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => resetForm())
        .catch((error) => {
          setSignInError(error.message);
        });
      // resetForm();
      // props.history.push("/");
    } catch (error) {
      alert(error.message);
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
          <h2>Login</h2>
        </Grid>

        {signInError != "" && (
          <>
            <Alert severity="error">
              <AlertTitle> {signInError}</AlertTitle>
            </Alert>
          </>
        )}

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
          />
          <br />
          <br />
          <TextField
            type="password"
            id="standard2"
            label="Password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete
          />
          <ButtonForm fullWidth style={btn} type="submit">
            LOGIN
          </ButtonForm>
          <Grid item>
            {" "}
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={signInWithGoogle}
            >
              CONTINUE WITH GMAIL
            </Button>
          </Grid>
          <br />

          <Grid item>
            <Link to="/loginMobile" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth color="secondary">
                CONTINUE WITH MOBILE
              </Button>
            </Link>
          </Grid>

          {/* if may other mode of login- https://colorlib.com/wp/wp-content/uploads/sites/2/login-form-v11.jpg */}
          {/* <Typography>Or login with</Typography> */}
          <Typography>
            Do you have an account?
            <Link to="/registration">Sign Up</Link>
          </Typography>
          <Link to="/resetPassword">
            <Typography>Forgot Password?</Typography>
          </Link>
          {/* not sure here, just trying to see if firebase works */}
          {/* <ButtonForm onClick={signInWithGoogle}>
            Continue with Gmail
          </ButtonForm> */}
        </form>
      </Paper>
    </Grid>
  );
};

export default withRouter(Login);
