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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export function Home() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.leftSide}>
          <div>
            <h1> This is the presidents message</h1>
          </div>
        </div>
        <div className={classes.rightSide}>
          <div>
            <h1> this is the news box</h1>
          </div>
          <div>
            <h1> this is the Events box</h1>
          </div>
        </div> 
      </div>
      <div>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
        <Typography className={classes.text} variant="h5" gutterBottom>
         Footer
        </Typography>
        </Toolbar>
      </AppBar>
      </div>
    </div>
  )
};
