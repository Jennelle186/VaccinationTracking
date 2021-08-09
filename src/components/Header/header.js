//header https://www.youtube.com/playlist?list=PLakAmVjYWIY6m-EfiY6swKgDjtnQgFS5A

import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
import DrawerComponent from "./DrawerComponent/drawer";

const Header = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <AppBar
        style={{
          position: "sticky",
          top: "0",
        }}
      >
        <Toolbar
          variant="dense"
          style={{
            backgroundColor: "#2196F3",
          }}
        >
          {/* //or just change this typography to an icon or picture */}
          {/*------------------- Name of the website -----------------*/}
          {isMatch ? (
            <></>
          ) : (
            <Typography variant="h6" color="inherit">
              Website
            </Typography>
          )}
          {/*------------------- Name of the website -----------------*/}

          {/* DrawerComponent is for the mobile view for the navbar. Tabs is for the desktop or large
          screen view */}
          {isMatch ? (
            <h1>
              <div>
                <DrawerComponent />
              </div>
            </h1>
          ) : (
            <div>
              <Tabs
                value={value}
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab disableRipple label="Homepage" to="/" component={Link} />
                <Tab disableRipple label="Login" to="/login" component={Link} />
                //idk what else to put it hereHHAHAHAH sample lang to sa baba
                para ma check ko if
                <Tab disableRipple label="Settings" />
                <Tab disableRipple label="Sample1" />
                <Tab disableRipple label="Sample2" />
                <Tab disableRipple label="Sample3" />
              </Tabs>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
