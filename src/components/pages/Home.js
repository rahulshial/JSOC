import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  gridBox: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    width: '100%',
    height: '100%',
    margin: '2px',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftSide: {
    border: '2px solid',
    maxHeight: '100vw'
  },
  rightSide: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    border: '2px solid',
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    elevation: 24,
    margin: theme.spacing(2),
    height: theme.spacing(16),
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

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.gridBox}>

          <div className={classes.leftSide}>
            <Paper variant="elevation" className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
              President's Message
              </Typography>
            </Paper>
          </div>
          <div className={classes.rightSide}>
            <div>
              <Paper variant="elevation" className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                News Box
                </Typography>
              </Paper>
            </div>
            <div>
              <Paper variant="elevation" className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                Events Box
                </Typography>
              </Paper>
            </div>                
          </div>

      </div>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            Footer
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
