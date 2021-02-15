/** React Imports */
import React from 'react';

/** Material UI imports */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

/** Local Imports */
import useApplicationData from '../../hooks/useApplicationData';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to='/'>Jain Society Of Calgary</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
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
}));

export function Login() {
  const classes = useStyles();
  const { state, setEmail, setPassword, setPasswordConfirmation, changeState, processEvent } = useApplicationData();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.loginError? 
          <div className={classes.root}>
            <Chip
              className={classes.smallOverlay}
              icon={<FaceIcon />}
              label={state.loginErrorLabel}
              color={state.errorBarColor}
            />
          </div>
          : <></>}
        <form className={classes.form} validate='true'>
          <TextField 
            variant="outlined"
            margin="normal" 
            required fullWidth id="email" 
            type="email"
            label="Email Address" 
            name="email" 
            autoComplete="email" 
            autoFocus 
            onChange={setEmail}/>
          {state.functionState === 'signIn'|| state.functionState === 'signUp'?
            <TextField 
              variant="outlined" 
              margin="normal" 
              required fullWidth 
              name="password"
              label="Password" 
              type="password" 
              id="password" 
              autoComplete="current-password"
              onChange={setPassword}/>
              : <></>}
          {state.functionState === 'signUp'?
            <TextField 
              variant="outlined" 
              margin="normal" 
              required fullWidth 
              name="passwordConfirmation"
              label="Password Confirmation" 
              type="password" 
              id="passwordConfirmation" 
              autoComplete=""
              onChange={setPasswordConfirmation}/>
              : <></>}
          <Button 
            type="submit" 
            fullWidth variant="contained" 
            color="primary" 
            className={classes.submit}
            onClick={(event) => {processEvent(event)}}>
            {state.mainButtonText}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link id="secondButton" variant="body2" onClick={changeState}>{state.secondButtonText}</Link>
            </Grid>
            <Grid item>
              <Link id="thirdButton" variant="body2" onClick={changeState}>{state.thirdButtonText}</Link>
            </Grid>
          </Grid>
        </form>
      </div>      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};