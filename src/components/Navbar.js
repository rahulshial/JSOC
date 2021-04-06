/** React Imports */
import React from 'react';
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
/**Material UI Imports */
import { makeStyles, AppBar, Toolbar, IconButton, CssBaseline } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

/** Local Imports */
import './Navbar.css';
import useApplicationData from '../hooks/useApplicationData';
import { signOut } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export function Navbar() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const { state } = useApplicationData();
  const history = useHistory();
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const logout = () => {
    removeCookie('userLogged');
    // dispatch(signOut);
    history.push('/');
    history.go(history.length - 1);
    window.location.reload();
  };

  let AuthButton, MemberArea, ExecutiveArea, LoggedInAs;
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
    LoggedInAs = <span className="item-nav">You're logged in as {cookies.userLogged.email}</span>
    if(cookies.userLogged.type === 'EC') {
      ExecutiveArea = <Link className="item-nav" to="/ExecutiveArea">ExecutiveArea</Link>;
    } else if(cookies.userLogged.type === 'MEM') {
      MemberArea = <Link className="item-nav" to="/MemberArea">MemberArea</Link>;
    };    
    AuthButton = <Link className="item-nav" to="#" onClick={(event) => {logout(event)}}>Logout</Link>;
  } else {
    AuthButton = <Link className="item-nav" to="/Login">     Login</Link>;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <CssBaseline />
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src='logo.png' alt="logo" className={classes.logo}></img>
          <Link className="item-nav" to="/">         Home</Link>
          <Link className="item-nav" to="/AboutUs">  About Us</Link>
          <Link className="item-nav" to="/Events">   Events</Link>
          <Link className="item-nav" to="/News">     News</Link>
          <Link className="item-nav" to="/Resources">Resources</Link>
          {MemberArea}
          {ExecutiveArea}
          {AuthButton}
          {LoggedInAs}
        </Toolbar>
      </AppBar>
    </div>
  );
};