import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/AppBar';

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
  }
}));

export function Home() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
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
    </div>
  )
};

