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
import { GET_GROUPS, GET_USERS, PUSH_MESSAGE, GROUP_SUBSCRIPTION } from "./App";
import { useMutation, useQuery } from "@apollo/client";
import ChatWindow from "./ChatWindow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
    padding: theme.spacing(6),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  card: {
    maxWidth: "75%",
    minWidth: "25%",
    height: "auto",
    margin: "8px",
  },
  cardContent: {
    padding: "0 0 0 16px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  cardHeader: {
    padding: "0 0 0 16px",
    "&:last-child": {
      paddingBottom: 0,
    },
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
  // TODO: Get from context
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [pushMessage] = useMutation(PUSH_MESSAGE);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const sendMessage = (draftMessage) => {
    if (!draftMessage) return;
    pushMessage({
      variables: {
        id: getGroups.data.groupMany[selectedGroupIndex]._id,
        message: draftMessage,
        user: props.user.id,
      },
    });
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
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="start"
            style={{ marginLeft: "auto" }}
            onClick={() => props.logOut()}
          >
            <ExitToAppIcon />
          </IconButton>
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
      {getGroups.data && getGroups.data.groupMany[selectedGroupIndex] && (
        <ChatWindow
          classes={classes}
          getGroups={getGroups}
          selectedGroupIndex={selectedGroupIndex}
          getUsers={getUsers}
          sendMessage={sendMessage}
          currentUser={props.user.id}
          subscribeToNewMessages={() =>
            getGroups.subscribeToMore({
              document: GROUP_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                return prev;
              },
            })
          }
        />
      )}
    </div>
  );
}

export default MainLayout;
