/** React Imports */
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";

/**Material UI Imports */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Local Imports */
import './Navbar.css';

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
  const history = useHistory();

  const logout = () => {
    removeCookie('userLogged');
    history.go('0');
  }

  let AuthButton, MemberArea, ExecutiveArea;
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
    console.log(cookies);
    if(cookies.userLogged.type === 'EC') {
      ExecutiveArea = <Link className="item-nav" to="/ExecutiveArea">ExecutiveArea</Link>;
    } else if(cookies.userLogged.type === 'MEM') {
      MemberArea = <Link className="item-nav" to="/MemberArea">MemberArea</Link>;
    };    
    AuthButton = <span className="item-nav" onClick={(event) => {logout(event)}}>Logout</span>;
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
        </Toolbar>
      </AppBar>
    </div>
  );
};