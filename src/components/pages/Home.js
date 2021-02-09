import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

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

  const [state, setState] = useState({
    message:'',
  });

  const newMessageState = (event) => {
    setState((prev) => ({
      ...prev,
      message: event.target.value,
    }));
  };

  useEffect(() => {
    axios
    .get(`/news/presmessage`)
    .then((row) => {
      const message = row.data[0].message;
      setState(prev => ({
        ...prev,
        message,
      }))
    })
    .catch(error => {
      console.log('Error fetching Presidents message: ', error)
    });
  },[]);

  const saveNewMessage = (event) => {
    console.log(state.message);
    
  };

  /** Render page */
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies && cookies.userLogged.type === 'EC') {
    return (
      <div style={{height: '100%'}}>
        <div className={classes.gridBox}>
          <div className={classes.leftSide}>
            <Paper variant="elevation" className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
                President's Message
              </Typography>
            </Paper>
            <Paper variant="elevation" className={classes.paper}>
              <TextField
                id="outlined-multiline-static"
                placeholder={state.message}
                value={state.message}
                fullWidth
                multiline
                margin="normal"
                rows={10}
                InputLabelProps={{
                  shrink: false
                }}
                variant="outlined"
                onChange={newMessageState}
              />
              <br />
            <Button variant="contained" color='primary'onClick={(event) => {saveNewMessage(event)}}>Save</Button>
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
            {state.message}
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
