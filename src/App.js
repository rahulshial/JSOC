import React, { useState, useReducer } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import News from './pages/News';
import Resources from './pages/Resources';
import Login from './pages/Login';
import MemberArea from './pages/MemberArea';
import ExecutiveArea from './pages/ExecutiveArea';
import ContactUs from './pages/ContactUs';
import Logout from './pages/Logout';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/AboutUs"><AboutUs /></Route>
          <Route path="/Events"><Events /></Route>
          <Route path="/News"><News /></Route>
          <Route path="/Resources"><Resources /></Route>
          <Route path="/MemberArea"><MemberArea /></Route>
          <Route path="/ExecutiveArea"><ExecutiveArea /></Route>
          <Route path="/ContactUs"><ContactUs /></Route>
          <Route path="/Login"><Login /></Route>
          <Route path="/Logout"><Logout /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
