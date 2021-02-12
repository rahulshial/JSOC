import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";
/** Material UI imports */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

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

export function SignUp() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["name"]);
  const history = useHistory();
  const [state, setState] = useState({
    email:'',
    password: '',
    passwordConfirmation: '',
    invalidPasswordError: false,
    userExistsError: false,
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

  const validateId = (event) => {
    event.preventDefault();
    if (state.password !== state.passwordConfirmation) {
      console.log('Non matching passwords', state.password, state.passwordConfirmation);
      setState((prev) => ({
        ...prev,
        invalidPasswordError: true,
      }));
    } else {
      /** check if user exists with email address */
      axios
      .get(`/users/${state.email}`)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          setState((prev) => ({
            ...prev,
            userExistsError: true,
          }));
        }
        else {
          console.log('user does not exist...create it')
          axios
          .post(`/users/${state.email}&${state.password}`)
          .then((res) => {
            console.log('user added!!!');
            const email = state.email;
            const type = res.data[0].type;
            setCookie("userLogged", { email, type }, { path: "/" });
            history.push('/');
            history.go(history.length - 1);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.invalidPasswordError? 
          <div className={classes.root}>
            <Chip
              className={classes.smallOverlay}
              icon={<FaceIcon />}
              label="Passwords do not match!"
              color="secondary"
            />
          </div>
          : <></>}
          {state.userExistsError? 
          <div className={classes.root}>
            <Chip
              className={classes.smallOverlay}
              icon={<FaceIcon />}
              label="User already exists, please login!"
              color="secondary"
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
          <Button 
            type="submit" 
            fullWidth variant="contained" 
            color="primary" 
            className={classes.submit}
            onClick={(event) => {validateId(event)}}>
            Create Account
          </Button>
        </form>
      </div>      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
};