//header https://www.youtube.com/playlist?list=PLakAmVjYWIY6m-EfiY6swKgDjtnQgFS5A

import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
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
      <AppBar>
        <Toolbar variant="dense">
          {/* //or just change this typography to an icon or picture */}
          <Typography>Website</Typography>
          {isMatch ? (
            <h1>
              <DrawerComponent />
            </h1>
          ) : (
            <Tabs
              value={value}
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab disableRipple label="Homepage" to="/" component={Link} />
              <Tab disableRipple label="Login" to="/login" component={Link} />
              //idk what else to put it hereHHAHAHAH sample lang to sa baba para
              ma check ko if
              <Tab disableRipple label="Settings" />
              <Tab disableRipple label="Sample1" />
              <Tab disableRipple label="Sample2" />
              <Tab disableRipple label="Sample3" />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
