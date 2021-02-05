import React, { useState, useReducer } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
// import Navbar   from './components/Navbar';

import { Navbar, AboutUs, ContactUs, Events, ExecutiveArea, Home, Login, Logout, MemberArea, News, Resources, SignUp } from './components'


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">       <Home /></Route>
          <Route path="/AboutUs">      <AboutUs /></Route>
          <Route path="/Events">       <Events /></Route>
          <Route path="/News">         <News /></Route>
          <Route path="/Resources">    <Resources /></Route>
          <Route path="/MemberArea">   <MemberArea /></Route>
          <Route path="/ExecutiveArea"><ExecutiveArea /></Route>
          <Route path="/ContactUs">    <ContactUs /></Route>
          <Route path="/Login">        <Login /></Route>
          <Route path="/Logout">       <Logout /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
