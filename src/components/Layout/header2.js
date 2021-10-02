import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";

import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Banner = (props) => {
  const { currentUser } = useSelector(mapState);
  const name = [
    currentUser?.firstName,
    currentUser?.middleName,
    currentUser?.lastName,
  ]
    .filter((part) => Boolean(part))
    .join(" ");
  return (
    <div id="header">
      <header>
        <div className="container text-center">
          <div className="banner-content">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item>
                <Typography
                  variant="h1"
                  style={{ marginTop: "5rem", color: "#36454F" }}
                >
                  Get Vaccinated Now
                </Typography>
                {currentUser ? (
                  <>
                    {(currentUser?.firstName && currentUser?.lastName) ||
                    currentUser?.middleName ? (
                      <Typography>Hello, {name}</Typography>
                    ) : (
                      <Typography>
                        <Link to="/Profile">
                          Please click this link below to update your profile
                        </Link>
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "1rem" }}
                      >
                        Login Now
                      </Button>
                    </Link>
                  </>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Banner;
