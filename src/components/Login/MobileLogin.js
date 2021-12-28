import React, { useState, Component } from "react";
import { firestore } from "../../Firebase/utils";
import { TextField, Button, Grid, Paper, Avatar } from "@material-ui/core";
import firebase from "firebase/app";

class MobileLogin extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      loading: true,
    });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptcha veifiedr");
        },
        defaultCountry: "PH", //not necessary
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+63" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP has been sent. Please wait for it");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...

        console.log(error);
      });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        try {
          const userRef = firestore.collection("users").doc(user.uid);
          const ref = userRef.set(
            {
              phoneNumber: this.state.mobile,
            },
            { merge: true }
          );
          console.log(" saved");
        } catch (err) {
          console.log(err);
        }
        // console.log(JSON.stringify(user.uid));
        // alert("User is verified");

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert(error);
      });
  };

  paperStyle = {
    padding: 20,
    height: "70vh",
    // width: 350,
    margin: "20px auto",
    padding: "3rem",
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={10} style={this.paperStyle}>
            <Grid align="center">
              <Avatar style={{ backgroundColor: "#2196F3" }}></Avatar>
              <h2>Phone Number Login</h2>
            </Grid>
            <br /> <br />
            <form onSubmit={this.onSignInSubmit}>
              <div id="sign-in-button"></div>
              <Grid item xs>
                <TextField
                  type="number"
                  label="Enter Mobile Number"
                  name="mobile"
                  required
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <br />
              <Grid item xs>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
            <form onSubmit={this.onSubmitOTP}>
              <Grid item xs>
                <TextField
                  type="number"
                  label="OTP Number"
                  name="otp"
                  required
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <br />
              <Grid item xs>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default MobileLogin;
// const MobileLogin = () => {
//   const [mobile, setMobile] = useState(0);
//   const [opt, setOtp] = useState(0);
//   return (
//     <div>
//       <br /> <br /> <br /> mobile login here
//       <h2>Login Form</h2>
//       <form>
//         <TextField
//           type="number"
//           label="Mobile Number"
//           name="mobile"
//           required
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//       <h2>OTP</h2>
//       <form>
//         <TextField
//           type="number"
//           label="OTP Number"
//           name="otp"
//           required
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// };

// export default MobileLogin;
