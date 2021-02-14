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

export function ChangePassword() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["name"]);
  const history = useHistory();
  const [state, setState] = useState({
    email:'',
    currPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
    errors: false,
    errortext: '',
    errorBarColor: 'secondary'
  });

  const setEmail = (event) => {
    setState((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  };

  const setCurrPassword = (event) => {
    setState((prev) => ({
      ...prev,
      currPassword: event.target.value,
    }));
  };

  const setNewPassword = (event) => {
    setState((prev) => ({
      ...prev,
      newPassword: event.target.value,
    }));
  };

  const setNewPasswordConfirmation = (event) => {
    setState((prev) => ({
      ...prev,
      newPasswordConfirmation: event.target.value,
    }));
  };

  const changePassword = (event) => {
    event.preventDefault();
    
    if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
      console.log(cookies.userLogged.email);
      setState((prev) => ({
        ...prev,
        email: cookies.userLogged.email,
      }));
      if (state.password !== state.passwordConfirmation) {
        setState((prev) => ({
          ...prev,
          errors: true,
          errorText: 'Passwords do not match, please enter matching passwords!'
        }));
      } else {
        /**send email, curr & new password to server to validate and update*/
        const currPassword = encodeURIComponent(state.currPassword);
        const newPassword = encodeURIComponent(state.newPassword);
        axios
        .patch(`/users/changePassword/${state.email}&${currPassword}&${newPassword}`)
        .then((res) => {
          let errorMessage = '';
          let errorBarColor = 'secondary'
          if (res.data.length > 0) {
            switch (res.data) {
              case 'invalid user':
                errorMessage = 'User not found!';
                break;
              case 'invalid password':
                errorMessage = 'Incorrect Current Password, please re-enter and try again!';
                break;
              case 'server error':
                errorMessage = 'Server error. Please try again later!';
                break;
              default:
                errorMessage = 'Password Change Success!';
                errorBarColor = 'primary';
                break;
              }
            setState((prev) => ({
              ...prev,
              errors: true,
              errorText: errorMessage,
              errorBarColor: errorBarColor,
            }));
          };
        })
        .catch((error) => {
          console.log(error);
        });
      }
    };
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
              label={state.errorText}
              color={state.errorBarColor}
            />
          </div>
          : <></>}
        <form className={classes.form} validate='true'>
          <TextField 
            variant="outlined" 
            margin="normal" 
            required fullWidth 
            name="currPassword"
            label="Current Password" 
            type="password" 
            id="currPassword"
            autoFocus 
            onChange={setCurrPassword}/>
          <TextField 
            variant="outlined" 
            margin="normal" 
            required fullWidth 
            name="newPassword"
            label="New Password" 
            type="password" 
            id="newPassword"
            onChange={setNewPassword}/>
          <TextField 
            variant="outlined" 
            margin="normal" 
            required fullWidth 
            name="newPasswordConfirmation"
            label="New Password Confirmation" 
            type="password"
            id="newPasswordConfirmation"
            autoComplete=""
            onChange={setNewPasswordConfirmation}/>
          <Button 
            type="submit" 
            fullWidth variant="contained" 
            color="primary" 
            className={classes.submit}
            onClick={(event) => {changePassword(event)}}>
            Submit
          </Button>
        </form>
      </div>      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
};