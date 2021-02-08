import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'green',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  leftSide: {
    display: "flex",
    border: '2px solid',
  },
  rightSide: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    border: '2px solid',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  footBar: {
    top: 'auto',
    bottom: 0,
    maxWidth: '100vw'
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
  },

  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export function Home() {
  const classes = useStyles();

  const messages = [
    {
      id: 1,
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: '/static/images/avatar/5.jpg',
    }]

  return (
    <div>
<Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
};

/**
 *       <div className={classes.root}>
        <div className={classes.body}>
          <div className={classes.leftSide}>
            <h1> presidents message</h1>
          </div>
          <div className={classes.rightSide}>
            <div>
              <h1> News box</h1>
            </div>
            <div>
              <h1> Events box</h1>
            </div>
          </div>
        </div>

        <div className={classes.footBar}>
        <AppBar position="static" color="primary">
          <h1> footer </h1>
        </AppBar>
        </div>
      </div>
 */