import { useState} from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

export default function useApplicationData() {
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

  return {
    state,
    setEmail,
    setPassword,
    changeState,
    setPasswordConfirmation,
    processEvent,
    // signInProcess,
    // passwordResetProcess,
    // signUpProcess,
  };
};
