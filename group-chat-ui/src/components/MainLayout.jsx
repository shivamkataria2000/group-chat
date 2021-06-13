import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import groupsData from "../test-data/groups.json";
import { Avatar, Card, CardContent, CardHeader } from "@material-ui/core";
import { GET_GROUPS, GET_USERS } from "./App";
import { useQuery } from "@apollo/client";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: "75%",
  },
}));

function MainLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  //const [groups, setGroups] = useState(groupsData);
  const getGroups = useQuery(GET_GROUPS);
  const getUsers = useQuery(GET_USERS);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {getGroups.data &&
          getGroups.data.groupMany.map((group, index) => (
            <ListItem
              button
              key={group._id}
              selected={index === selectedGroupIndex}
              onClick={() => setSelectedGroupIndex(index)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={group.name}
                secondary={group.description}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {getGroups.loading
              ? "Loading ..."
              : getGroups.data.groupMany[selectedGroupIndex].name}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {getGroups.data &&
          getGroups.data.groupMany[selectedGroupIndex].chat.map(
            (messageBlock, index) => {
              const fromUser = getUsers.data
                ? getUsers.data.userMany.find(
                    (user) => user._id === messageBlock.user
                  )
                : null;
              return (
                <Card key={index} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {fromUser ? getInitials(fromUser.name) : "U"}
                      </Avatar>
                    }
                    title={fromUser ? fromUser.name : "User"}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {messageBlock.message}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }
          )}
      </main>
    </div>
  );
}

export default MainLayout;
