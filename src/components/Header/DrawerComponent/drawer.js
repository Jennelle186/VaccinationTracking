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
  AppBar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerComponent = () => {
  const useStyles = makeStyles((theme) => ({
    drawerContainer: {
      width: "200",
    },
    iconButtonContainer: {
      marginLeft: "auto",
      color: "black",
      float: "right",
      marginRight: theme.spacing(2),
    },
    list: {
      width: 200,
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
      },
    },
    menuIconToggle: {
      marginRight: "1rem",
      color: "black",
    },
    website: {
      marginRight: "1rem",
    },
    header: {
      backgroundColor: "transparent",
    },
  }));

  const [openDrawer, setOpenDrawer] = useState(false);

  //Css
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.header}>
        <IconButton
          edge="start"
          className={classes.iconButtonContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
          aria-label="menu"
        >
          <Typography variant="h6" className={classes.website}>
            Website Name
          </Typography>
          <MenuIcon fontSize="large" className={classes.menuIconToggle} />
        </IconButton>
      </AppBar>

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

          <Link to="/Sample1" className={classes.link}>
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText>Sample1</ListItemText>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link to="/Sample2" className={classes.link}>
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <ListItemText> Sample2</ListItemText>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
