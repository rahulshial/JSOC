
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

export function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const history = useHistory();

  const logout = () => {
    removeCookie('userLogged');
    history.push('/home');
  }
  return (
    <div>
      <h1>This is the Logout Page!!</h1>
      {logout}
    </div>
  );
};