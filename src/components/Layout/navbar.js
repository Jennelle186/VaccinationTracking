import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  makeStyles,
  useMediaQuery,
  useTheme,
  AppBar,
  Typography,
  Grid,
  Toolbar,
} from "@material-ui/core";
import DrawerComponent from "./../Header/DrawerComponent/drawer";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  button: {
    borderRadius: "12px",
  },
  header: {
    top: "0",
    width: "100%",
    backgroundColor: "transparent",
    position: "fixed",
    paddingTop: "10px",
    zIndex: "1000",
  },
  logo: {
    width: "80x",
    height: "80px",
    marginLeft: "20px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    padding: "10px",
  },
  link: {
    padding: "2px",
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <section id="the-whole-nav">
      <div className={classes.header}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Grid item>
            <div>
              <img
                className={classes.logo}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
                alt="company's logo"
              />
            </div>
          </Grid>
          <Grid item>
            <Toolbar>
              <Toolbar>
                <Link to="/" className={classes.link}>
                  <Typography variant="h6" className={classes.title}>
                    Home
                  </Typography>
                </Link>
                <Link to="/profile" className={classes.link}>
                  <Typography variant="h6" className={classes.title}>
                    Profile
                  </Typography>
                </Link>
                <Link to="/QR-Code" className={classes.link}>
                  <Typography variant="h6" className={classes.title}>
                    QR code
                  </Typography>
                </Link>
              </Toolbar>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <Link to="#" className={classes.link}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Button
                </Button>
              </Link>
              <Link to="#" className={classes.link}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Button
                </Button>
              </Link>
            </Toolbar>
          </Grid>
        </Grid>
      </div>

      <div id="mobile-nav">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
                alt="company's logo"
              />
            </div>

            <div className="col-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
