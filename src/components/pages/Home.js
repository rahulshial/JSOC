import React from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to='/'>Jain Society Of Calgary</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  gridBox: {
    boxSizing: 'none',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    width: '100%',
    height: '100%',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftSide: {
    border: '2px solid',
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
    height: 'auto',
  },
  footBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export function Home() {
  const classes = useStyles();

  const [cookies] = useCookies(["name"]);
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies && cookies.userLogged.type === 'EC') {
    return (
      <div style={{height: '100%'}}>
        {/* <CssBaseline /> */}
        <div className={classes.gridBox}>
          <div className={classes.leftSide}>
            <Paper variant="elevation" className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
                President's Message
              </Typography>
            </Paper>
            <Paper variant="elevation" className={classes.paper}>
              <TextareaAutosize
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua."
              />
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
        <Box mt={8}>
          <Copyright />
        </Box>
        <AppBar position="fixed" color="primary" className={classes.footBar}>
          <Toolbar>
          <Copyright />
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div style={{height: '100%'}}>
        {/* <CssBaseline /> */}
        <div className={classes.gridBox}>
          <div className={classes.leftSide}>
            <Paper variant="elevation" className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
                President's Message
              </Typography>
            </Paper>
            <Paper variant="elevation" className={classes.paper}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
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
        <Box mt={8}>
          <Copyright />
        </Box>
        <AppBar position="fixed" color="primary" className={classes.footBar}>
          <Toolbar>
          <Copyright />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}
