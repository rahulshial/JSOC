import axios from 'axios';
import React, { useEffect } from 'react';

export function Activation() {

  useEffect(() => {
    const activationData = window.location.pathname.split("/").pop().split(":");
    console.log(activationData);
    axios
    .post('/users/activate', activationData)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <div>
      ACTIVATING
    </div>
  )
};
