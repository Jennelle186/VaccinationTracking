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
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerComponent = () => {
  const useStyles = makeStyles((theme) => ({
    drawerContainer: {
      width: "200",
    },
    iconButtonContainer: {
      marginLeft: "auto",
      color: "white",
      float: "right",
      marginRight: theme.spacing(2),
    },
    list: {
      width: 200,
    },
    link: {
      textDecoration: "none",
    },
    menuIconToggle: {
      marginRight: "1rem",
    },
  }));

  const [openDrawer, setOpenDrawer] = useState(false);

  //Css
  const classes = useStyles();
  return (
    <div>
      <IconButton
        edge="end"
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        aria-label="menu"
      >
        <MenuIcon fontSize="large" className={classes.menuIconToggle} />
        <Typography variant="h6" color="inherit">
          Website
        </Typography>
      </IconButton>

      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
      >
        <List className={classes.list}>
          <Link to="/" className={classes.link}>
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText>Homepage</ListItemText>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link to="/login" className={classes.link}>
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
    </div>
  );
};

export default DrawerComponent;
