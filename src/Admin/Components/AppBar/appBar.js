import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AdminLinks from "../../AdminRoute/AdminLinks/AdminLinks";

//links
import { Link } from "react-router-dom";

//core material-ui imports
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

//icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import StoreIcon from "@material-ui/icons/Store";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    fontSize: "20px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: "none",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            aria-label="account of current user"
            aria-controls="menu-appbar"
            className={classes.title}
            color="primary"
          >
            <Link to="/admin" className={classes.link}>
              Vaccination Tracking
            </Link>
          </Typography>
          <div>
            <Typography
              color="primary"
              noWrap
              variant="h5"
              style={{
                padding: "1rem",
              }}
            >
              Welcome, Admin
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {/* {Back to Store} */}
          <Link to="/" className={classes.link}>
            <ListItem button key="Store">
              <ListItemIcon>
                <StoreIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Back to Home</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          {/* {Back to Store} */}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        <List>
          <Link to="/admin" className={classes.link}>
            <ListItem button key="Home">
              <ListItemIcon>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Dashboard</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/reports" className={classes.link}>
            <ListItem button key="Menu">
              <ListItemIcon>
                <MenuBookIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h6">Vaccination Reports</Typography>
            </ListItem>
          </Link>
          <Link to="/announcement" className={classes.link}>
            <ListItem button key="Orders">
              <ListItemIcon>
                <RemoveShoppingCartIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h6">Announcement</Typography>
            </ListItem>
          </Link>

          <Link to="/users" className={classes.link}>
            <ListItem button key="Admin">
              <ListItemIcon>
                <SupervisedUserCircleIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h6">Users</Typography>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <AdminLinks />
      </main>
    </div>
  );
}
