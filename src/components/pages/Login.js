/** React Imports */
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

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
import { TramRounded } from '@material-ui/icons';

/** Local Imports */

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
  const [cookies, setCookie] = useCookies(["name"]);
  const history = useHistory();
  const [state, setState] = useState({
    email:'',
    password: '',
    passwordConfirmation: '',
    loginError: false,
    loginErrorLabel: '',
    mainButtonText: 'Sign In',
    functionState: 'signIn',
    secondButtonText: 'Forgot Password?',
    thirdButtonText: "Don't have an account? Sign Up",
    invalidPasswordError: false,
    userExistsError: false,
    errorBarColor: 'secondary',
  });

  const setEmail = (event) => {
    setState((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  };

  const setPassword = (event) => {
    setState((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  };

  const setPasswordConfirmation = (event) => {
    setState((prev) => ({
      ...prev,
      passwordConfirmation: event.target.value,
    }));
  };

  const signInProcess = () => {
    const encodedPassword = encodeURIComponent(state.password);
    axios
    .get(`/users/${state.email}&${encodedPassword}`)
    .then((res) => {
      if (res.data.length > 0) {
        if(res.data === 'server error') {
          setState((prev) => ({
            ...prev,
            loginError: true,
            loginErrorLabel: 'Server Error. Please try again later!!!',
          }));
        } else if (res.data === 'invalid user') {
          setState((prev) => ({
            ...prev,
            loginError: true,
            loginErrorLabel: 'Email / Password combination does not exist',
          }));
        } else {
          const email = state.email;
          const type = res.data[0].type;
          setCookie("userLogged", { email, type }, { path: "/" });
          history.push('/');
          history.go(history.length - 1);
          window.location.reload();
        }
      };
    })
    .catch((error) => {
      console.log(error);
      setState((prev) => ({
        ...prev,
        loginError: true,
        loginErrorLabel: 'Server Error. Please try again later!!!',
      }));
    });
  };

  const passwordResetProcess = () => {
    axios
    .post(`/users/password-reset/${state.email}`)
    .then((res) => {
      if (res.data.length > 0) {
        if (res.data === 'invalid user') {
          setState((prev) => ({
            ...prev,
            loginError: true,
            loginErrorLabel: 'User email not found!',
          }));
        } else if (res.data === 'success') {
          setState((prev) => ({
            ...prev,
            loginError: true,
            loginErrorLabel: 'Please check your email for password reset email!',
            errorBarColor: 'primary',
            functionState: 'signIn',
            mainButtonText: 'Sign In',
            secondButtonText: 'Forgot Password?',
            thirdButtonText: "Don't have an account? Sign Up",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            loginError: true,
            loginErrorLabel: 'Error sending email, please try again later!',
            functionState: 'signIn',
            mainButtonText: 'Sign In',
            secondButtonText: 'Forgot Password?',
            thirdButtonText: "Don't have an account? Sign Up",
          }));
        }
      }
    })
    .catch((error) => {
      setState((prev) => ({
        ...prev,
        loginError: true,
        loginErrorLabel: 'Error Retrieving Data, please try again later!',
      }));
    });
  };

  const signUpProcess = () => {
    if (state.password !== state.passwordConfirmation) {
      setState((prev) => ({
        ...prev,
        loginError: true,
        loginErrorLabel: 'Passwords do not match!',
      }));
    } else {
      axios
      .post(`/users/${state.email}&${state.password}`)
      .then((res) => {
        if(res.data.length > 0) {
          if(res.data === "user exists") {
            setState((prev) => ({
              ...prev,
              loginError: true,
              loginErrorLabel: 'User Exists. Consider Sign In!!!',
            }));  
          } else if (res.data === 'success') {
            const email = state.email;
            const type = 'MEM';
            setCookie("userLogged", { email, type }, { path: "/" });
            history.push('/');
            history.go(history.length - 1);
            window.location.reload();    
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setState((prev) => ({
          ...prev,
          loginError: true,
          loginErrorLabel: 'Server Error. Please try again later!!!',
        }));
      });
    }
  };

  const processEvent = (event) => {
    event.preventDefault();
    if(state.functionState === 'signIn') {
      signInProcess();
    } else if(state.functionState === 'passwordReset') {
      passwordResetProcess();
    } else if(state.functionState === 'signUp') {
      signUpProcess();
    }
  };

  const changeState = (event) => {
    event.preventDefault();
    const buttonClicked = event.target.childNodes[0].parentElement.attributes[1].nodeValue;
    if(state.functionState === 'signIn' && buttonClicked === 'secondButton') {
      setState((prev) => ({
        ...prev,
        functionState: 'passwordReset',
        mainButtonText: 'Send Password Reset Email',
        secondButtonText: 'Sign In',
        thirdButtonText: "Don't have an account? Sign Up",
      }));
    } else if(state.functionState === 'passwordReset' && buttonClicked === 'secondButton') {
      setState((prev) => ({
        ...prev,
        functionState: 'signIn',
        mainButtonText: 'Sign In',
        secondButtonText: 'Forgot Password?',
        thirdButtonText: "Don't have an account? Sign Up",
      }));  
    } else if(buttonClicked === 'thirdButton') {
      setState((prev) => ({
        ...prev,
        functionState: 'signUp',
        mainButtonText: 'Create Account',
        secondButtonText: 'Sign In?',
        thirdButtonText: ''
      }));
    } else if(state.functionState === 'signUp' && buttonClicked === 'secondButton') {
      setState((prev) => ({
        ...prev,
        functionState: 'signIn',
        mainButtonText: 'Sign In',
        secondButtonText: 'Forgot Password?',
        thirdButtonText: "Don't have an account? Sign Up",
      }));
    };
  };

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
}