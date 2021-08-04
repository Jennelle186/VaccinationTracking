import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerComponent = () => {
  const useStyles = makeStyles((theme) => ({
    drawerContainer: {},
    iconButtonContainer: {
      marginLeft: "auto",
      color: "white",
    },

    menuIconToggle: {
      fontSize: "3rem",
    },
    link: {
      textDecoration: "none",
    },
  }));

  const [openDrawer, setOpenDrawer] = useState(false);

  //Css
  const classes = useStyles();
  return (
    <div>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
      >
        <List className={classes.link}>
          <Link to="/">
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText> Homepage</ListItemText>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link to="/login">
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText> Login</ListItemText>
              </ListItemIcon>
            </ListItem>
          </Link>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>Sample</ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText> Sample</ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      <IconButton
        edge="end"
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </div>
  );
};

export default DrawerComponent;
