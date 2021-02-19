import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";

import './App.css';

import { Navbar, AboutUs, ContactUs, Events, ExecutiveArea, Home, Login, MemberArea, News, Resources, Activation } from './components'


function App() {
    return (
    <div className="App">
      {/* <CssBaseline /> */}
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
          <Route path="/activation">   <Activation /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
